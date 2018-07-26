import { all, takeEvery } from 'redux-saga/effects';
import { openDApp, sendDAppMessage } from './sagas';
import { OPEN_DAPP, SEND_DAPP_MESSAGE } from '../../actions/nativeDApps';

/**
 * @desc Root key saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    yield takeEvery(OPEN_DAPP, openDApp),
    yield takeEvery(SEND_DAPP_MESSAGE, sendDAppMessage),
  ]);
}
