import { all, takeEvery } from 'redux-saga/effects';

import { UPDATE_WALLET_BALANCE, UPDATE_WALLET_LIST } from '../../actions/wallet';
import { updateWalletList, updateWalletBalance } from './sagas';


function* watchUpdateWalletList() {
  yield takeEvery(UPDATE_WALLET_LIST, updateWalletList);
}

function* watchUpdateWalletBalance() {
  yield takeEvery(UPDATE_WALLET_BALANCE, updateWalletBalance);
}

export default function* rootSaga() {
  yield all([
    watchUpdateWalletList(),
    watchUpdateWalletBalance(),
  ]);
}
