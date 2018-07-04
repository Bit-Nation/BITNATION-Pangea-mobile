import { all, call, takeEvery } from 'redux-saga/effects';
import { startDAppSaga, openDApp, performDAppCallback, startDatabaseListening } from './sagas';
import { START_DAPP, OPEN_DAPP, PERFORM_DAPP_CALLBACK } from '../../actions/dApps';

/**
 * @desc Root key saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(startDatabaseListening),
    yield takeEvery(START_DAPP, startDAppSaga),
    yield takeEvery(OPEN_DAPP, openDApp),
    yield takeEvery(PERFORM_DAPP_CALLBACK, performDAppCallback),
  ]);
}
