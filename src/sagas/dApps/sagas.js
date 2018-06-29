// @flow

import { call, select, put } from 'redux-saga/effects';
import { Realm } from 'realm';

import type { OpenDAppAction, PerformDAppCallbackAction, StartDAppAction } from '../../actions/dApps';
import { getDApp as getDAppFromState } from '../../reducers/dApps';
import { dAppsListUpdated, dAppStarted, dAppStartFailed, startDApp } from '../../actions/dApps';
import DAppsService from '../../services/dApps';
import type { DAppType as DBDApp } from '../../services/database/schemata';
import { currentAccountBasedUpdate } from '../accounts/sagas';

/**
 * @desc Function that creates Realm results fetching DApps for specific account.
 * @param {Realm} db Realm instance.
 * @param {string|null} accountId Id of account to fetch logs or null.
 * @return {Realm.Results<DBDApp>|null} Realm results fetching DApps for specified account or null if not applicable.
 */
export function buildDAppsResults(db: Realm, accountId: string | null) {
  if (accountId === null) {
    return null;
  }
  return db.objects('DApp').filtered(`accountId == '${accountId}'`);
}

/**
 * @desc Generator to be called on database change. Used to update DApps list.
 * @param {*} collection Updated DApps collection
 * @return {void}
 */
export function* onCurrentAccountChange(collection: Realm.Result<DBDApp>): Generator<*, *, *> {
  yield put(dAppsListUpdated(collection));
  const { dApps: { startedDAppIds } } = yield select();
  for (let i = 0; i < collection.length; i += 1) {
    const { publicKey } = collection[i];
    if (!startedDAppIds.includes(publicKey)) {
      yield put(startDApp(publicKey));
    }
  }
}

/**
 * @desc Starts listen to messages updates in database.
 * @return {void}
 */
export function* startDatabaseListening(): Generator<*, *, *> {
  yield call(currentAccountBasedUpdate, buildDAppsResults, onCurrentAccountChange);
}

/**
 * @desc Get DApp from state by public key. If not available returns undefined.
 * @param {string} publicKey Public key of desired DApp.
 * @return {void}
 */
export function* getDApp(publicKey: string): Generator<*, *, *> {
  const { dApps } = yield select();
  return getDAppFromState(dApps, publicKey);
}

/**
 * @desc Starts DApp, i.e. prepares it to be opened later.
 * @param {StartDAppAction} action An action.
 * @return {void}
 */
export function* startDAppSaga(action: StartDAppAction): Generator<*, *, *> {
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
