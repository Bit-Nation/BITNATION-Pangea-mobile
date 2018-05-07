/* eslint-disable */

import { all, takeEvery, call } from 'redux-saga/effects';

import { SEND_MONEY } from '../../actions/wallet';
import { sendMoneySaga } from './sagas';

function* watchSendMoney() {
  yield takeEvery(SEND_MONEY, sendMoneySaga);
}

export default function* rootSaga() {
  yield all([
    call(watchSendMoney),
  ]);
}
