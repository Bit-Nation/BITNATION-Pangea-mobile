import { all, takeEvery } from 'redux-saga/effects';
import { startDApp, openDApp, performDAppCallback } from './sagas';
import { START_DAPP, OPEN_DAPP, PERFORM_DAPP_CALLBACK } from '../../actions/dapps';

/**
 * @desc Root key saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    yield takeEvery(START_DAPP, startDApp),
    yield takeEvery(OPEN_DAPP, openDApp),
    yield takeEvery(PERFORM_DAPP_CALLBACK, performDAppCallback),
  ]);
}
