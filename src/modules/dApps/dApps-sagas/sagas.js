// @flow

import { call, select, put } from 'redux-saga/effects';

import type {
  DAppsListUpdatedAction,
  OpenDAppAction,
  PerformDAppCallbackAction, RenderDAppMessageAction,
  StartDAppAction, StopDAppAction,
} from '../dApps-actions.js';
import { dAppLaunchStateChanged, dAppsListUpdated, startDApp } from '../dApps-actions';
import DAppsService from '../dApps-service';
import { getDApp, getDAppLaunchState } from '../dApps-reducers';
import type { DApp } from '../DApp-types';

/**
 * @desc Fetch list of DApps.
 * @return {void}
 */
export function* fetchDApps(): Generator<*, *, *> {
  const dApps = yield call(DAppsService.getDApps);
  yield put(dAppsListUpdated(dApps));
}

/**
 * @desc Callback on DApps list update.
 * @param {DAppsListUpdatedAction} action An action.
 * @return {void}
 */
export function* onDAppsListUpdated(action: DAppsListUpdatedAction): Generator<*, *, *> {
  const { availableDApps } = action;
  const { dApps: dAppsState } = yield select();
  for (let i = 0; i < availableDApps.length; i += 1) {
    const { publicKey } = availableDApps[i];
    const launchState = getDAppLaunchState(dAppsState, publicKey);
    if (launchState === 'off') {
      yield put(startDApp(publicKey));
    }
  }
}

/**
 * @desc Get DApp from state by public key. If not available returns undefined.
 * @param {string} publicKey Public key of desired DApp.
 * @return {void}
 */
export function* getDAppSaga(publicKey: string): Generator<*, *, *> {
  return yield select(state => getDApp(state.dApps, publicKey));
}

/**
 * @desc Get DApp launch state from state by public key. If not available returns undefined.
 * @param {string} publicKey Public key of desired DApp.
 * @return {void}
 */
export function* getDAppLaunchStateSaga(publicKey: string): Generator<*, *, *> {
  return yield select(state => getDAppLaunchState(state.dApps, publicKey));
}

/**
 * @desc Starts DApp, i.e. prepares it to be opened later.
 * @param {StartDAppAction} action An action.
 * @return {void}
 */
export function* startDAppSaga(action: StartDAppAction): Generator<*, *, *> {
  try {
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'starting'));
    yield call(DAppsService.startDApp, action.dAppPublicKey);
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'started'));
  } catch (error) {
    console.log(`[DAPP] Start failed: ${JSON.stringify(error)}`);
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'off'));
  }
}

/**
 * @desc Stops DApp.
 * @param {StopDAppAction} action An action.
 * @return {void}
 */
export function* stopDAppSaga(action: StopDAppAction): Generator<*, *, *> {
  try {
    yield call(DAppsService.stopDApp, action.dAppPublicKey);
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'off'));
  } catch (error) {
    console.log(`[DAPP] Stop failed: ${error.toString()}`);
  }
}

/**
 * @desc Opens DApp.
 * @param {OpenDAppAction} action An action.
 * @return {void}
 */
export function* openDApp(action: OpenDAppAction): Generator<*, *, *> {
  const { dAppPublicKey, callback } = action;
  const dApp: ?DApp = yield call(getDAppSaga, dAppPublicKey);
  if (dApp == null) {
    yield call(callback, false, new Error(`Unable to find DApp with public key ${dAppPublicKey}`));
    return;
  }
  const { dApps: { context } } = yield select();

  try {
    yield call(DAppsService.openDApp, dAppPublicKey, context);
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'opened'));
    yield call(callback, true);
  } catch (error) {
    if (error === 'Error: it seems like that this app hasn\'t been started yet') {
      yield call(startDAppSaga);
      yield call(openDApp, action);
      return;
    }
    console.log(`[DApp] Open failed: ${error}`);
    yield call(callback, false, error);
  }
}

/**
 * @desc Performs DApp callback.
 * @param {PerformDAppCallbackAction} action An action.
 * @return {void}
 */
export function* performDAppCallback(action: PerformDAppCallbackAction): Generator<*, *, *> {
  const { dAppPublicKey, callbackID, args } = action;
  const { dApps: { context } } = yield select();

  try {
    yield put(dAppLaunchStateChanged(dAppPublicKey, 'working'));
    yield call(DAppsService.performDAppCallback, dAppPublicKey, callbackID, { context, ...args });
  } catch (error) {
    console.log(`DApp callback with ID ${callbackID} failed to execute: ${error}`);
  } finally {
    const launchState = yield call(getDAppLaunchStateSaga, dAppPublicKey);
    // If DApp was not interrupted or changed its state another way then we should return it back.
    if (launchState === 'working') {
      yield put(dAppLaunchStateChanged(dAppPublicKey, 'opened'));
    }
  }
}

/**
 * @desc Renders DApp message and returns a layout.
 * @param {RenderDAppMessageAction} action An action.
 * @return {void}
 */
export function* renderDAppMessage(action: RenderDAppMessageAction): Generator<*, *, *> {
  const { message, callback } = action;
  const { dApps: { context } } = yield select();

  try {
    const layoutString = yield call(DAppsService.renderDAppMessage, message, { ...context });
    let layout = JSON.parse(layoutString);
    if (Array.isArray(layout.children) && layout.children.length > 0) {
      [layout] = layout.children;
    }
    if (layout.type === undefined) {
      // Fallback to empty view in case of empty layout.
      layout.type = 'view';
      layout.props = {};
      layout.children = [];
    }
    yield call(callback, layout);
  } catch (error) {
    if (error === 'Error: it seems like that this app hasn\'t been started yet') {
      yield call(startDAppSaga);
      yield call(renderDAppMessage, action);
      return;
    }
    console.log(`[DAPP] Fail to render message: ${JSON.stringify(message)} with error: ${error}`);
    yield call(callback, null);
  }
}
