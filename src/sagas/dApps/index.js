// @flow

import { all, takeEvery } from 'redux-saga/effects';
import { startDAppSaga, openDApp, performDAppCallback, onDAppsListUpdated, fetchDApps } from './sagas';
import { START_DAPP, OPEN_DAPP, PERFORM_DAPP_CALLBACK, DAPPS_LIST_UPDATED } from '../../actions/dApps';
import { SERVICES_CREATED } from '../../actions/serviceContainer';

/**
 * @desc Root DApps saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    yield takeEvery(SERVICES_CREATED, fetchDApps),
    yield takeEvery(DAPPS_LIST_UPDATED, onDAppsListUpdated),
    yield takeEvery(START_DAPP, startDAppSaga),
    yield takeEvery(OPEN_DAPP, openDApp),
    yield takeEvery(PERFORM_DAPP_CALLBACK, performDAppCallback),
  ]);
}
