/* eslint-disable */

import { all, takeEvery, call } from 'redux-saga/effects';
import { SEND_MONEY, UPDATE_WALLET_BALANCE, UPDATE_WALLET_LIST } from '../../actions/wallet';
import { updateWalletList, updateWalletBalance, sendMoneySaga } from './sagas';

function* watchUpdateWalletList() {
  yield takeEvery(UPDATE_WALLET_LIST, updateWalletList);
}

function* watchUpdateWalletBalance() {
  yield takeEvery(UPDATE_WALLET_BALANCE, updateWalletBalance);
}

function* watchSendMoney() {
  yield takeEvery(SEND_MONEY, sendMoneySaga);
}

export default function* rootSaga() {
  yield all([
    watchUpdateWalletList(),
    watchUpdateWalletBalance(),
    watchSendMoney(),
    call(watchSendMoney),
  ]);
}
