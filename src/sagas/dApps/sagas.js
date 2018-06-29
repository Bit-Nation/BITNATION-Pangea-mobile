// @flow

import { call, select, put } from 'redux-saga/effects';

import type { OpenDAppAction, PerformDAppCallbackAction, StartDAppAction } from '../../actions/dapps';
import { getDApp as getDAppFromState } from '../../reducers/dApps';
import { dAppStarted, dAppStartFailed } from '../../actions/dapps';
import DAppsService from '../../services/dapps';

/**
 * @desc Get DApp from state by public key. If not available returns undefined.
 * @param {string} publicKey Public key of desired DApp.
 * @return {void}
 */
export function* getDApp(publicKey: string): Generator<*, *, *> {
  const { dapps } = yield select();
  return getDAppFromState(dapps, publicKey);
}

/**
 * @desc Starts DApp, i.e. prepares it to be opened later.
 * @param {StartDAppAction} action An action.
 * @return {void}
 */
export function* startDApp(action: StartDAppAction): Generator<*, *, *> {
  const dApp = yield call(getDApp, action.dAppPublicKey);
  if (dApp == null) {
    yield put(dAppStartFailed(action.dAppPublicKey));
    return;
  }

  try {
    yield call(DAppsService.startDApp, dApp);
    yield put(dAppStarted(action.dAppPublicKey));
  } catch (error) {
    console.log(`DApp start failed: ${error}`);
    yield put(dAppStartFailed(action.dAppPublicKey));
  }
}

/**
 * @desc Opens DApp.
 * @param {OpenDAppAction} action An action.
 * @return {void}
 */
export function* openDApp(action: OpenDAppAction): Generator<*, *, *> {
  const { dAppPublicKey, callback } = action;
  const dApp = yield call(getDApp, dAppPublicKey);
  if (dApp == null) {
    yield call(callback, false, new Error(`Unable to find DApp with public key ${dAppPublicKey}`));
    return;
  }
  const { dApps: { contexts } } = yield select();
  const context = contexts[dAppPublicKey] || {};

  try {
    yield call(DAppsService.openDApp, dAppPublicKey, context);
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
