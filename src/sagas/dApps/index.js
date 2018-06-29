import { all, takeEvery } from 'redux-saga/effects';
import { startDApp, openDApp } from './sagas';
import { START_DAPP, OPEN_DAPP } from '../../actions/dapps';

/**
 * @desc Root key saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    yield takeEvery(START_DAPP, startDApp),
    yield takeEvery(OPEN_DAPP, openDApp),
  ]);
}
