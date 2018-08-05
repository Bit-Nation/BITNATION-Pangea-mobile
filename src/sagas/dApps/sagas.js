// @flow

import { call, select, put } from 'redux-saga/effects';

import type {
  DAppsListUpdatedAction,
  OpenDAppAction,
  PerformDAppCallbackAction,
  StartDAppAction,
} from '../../actions/dApps';
import { dAppLaunchStateChanged, dAppsListUpdated, startDApp } from '../../actions/dApps';
import DAppsService from '../../services/dApps';
import { getDApp, getDAppLaunchState } from '../../reducers/dApps';
import type { DApp } from '../../types/DApp';

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
 * @desc Starts DApp, i.e. prepares it to be opened later.
 * @param {StartDAppAction} action An action.
 * @return {void}
 */
export function* startDAppSaga(action: StartDAppAction): Generator<*, *, *> {
  const dApp: ?DApp = yield call(getDAppSaga, action.dAppPublicKey);
  if (dApp == null) {
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'off'));
    return;
  }

  try {
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'starting'));
    yield call(DAppsService.startDApp, dApp);
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'started'));
  } catch (error) {
    console.log(`DApp start failed: ${error}`);
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'off'));
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
  const { dApps: { contexts } } = yield select();
  const context = contexts[dAppPublicKey] || {};

  try {
    yield call(DAppsService.openDApp, dAppPublicKey, context);
    yield put(dAppLaunchStateChanged(action.dAppPublicKey, 'opened'));
    yield call(callback, true);
  } catch (error) {
    console.log(`DApp open failed: ${error}`);
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
  const { dApps: { contexts } } = yield select();
  const context = contexts[dAppPublicKey] || {};

  try {
    yield call(DAppsService.performDAppCallback, dAppPublicKey, callbackID, { context, ...args });
  } catch (error) {
    console.log(`DApp callback with ID ${callbackID} failed to execute: ${error}`);
  }
}
