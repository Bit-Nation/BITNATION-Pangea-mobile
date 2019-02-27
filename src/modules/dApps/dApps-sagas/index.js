// @flow

import { all, takeEvery } from 'redux-saga/effects';
import {
  startDAppSaga,
  openDApp,
  performDAppCallback,
  onDAppsListUpdated,
  fetchDApps,
  stopDAppSaga,
  renderDAppMessage,
} from './sagas';
import {
  START_DAPP,
  OPEN_DAPP,
  PERFORM_DAPP_CALLBACK,
  DAPPS_LIST_UPDATED,
  STOP_DAPP,
  RENDER_DAPP_MESSAGE,
} from '../dApps-actions';
import { SERVICES_CREATED } from 'pangea-common/serviceContainer-actions';
import { subscribeToModalRender } from './renderModal';

/**
 * @desc Root DApps saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    yield takeEvery(SERVICES_CREATED, fetchDApps),
    yield takeEvery(SERVICES_CREATED, subscribeToModalRender),
    yield takeEvery(DAPPS_LIST_UPDATED, onDAppsListUpdated),
    yield takeEvery(START_DAPP, startDAppSaga),
    yield takeEvery(STOP_DAPP, stopDAppSaga),
    yield takeEvery(OPEN_DAPP, openDApp),
    yield takeEvery(PERFORM_DAPP_CALLBACK, performDAppCallback),
    yield takeEvery(RENDER_DAPP_MESSAGE, renderDAppMessage),
  ]);
}
