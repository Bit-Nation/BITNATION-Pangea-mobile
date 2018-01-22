import { all, call, put, fork, select, cancel } from 'redux-saga/effects';
import _ from 'lodash';

import {
  requestTransactionConfirmation, sendMoneyFailed, sendMoneySuccess,
  walletsListUpdated,
} from '../../actions/wallet';
import { getWallets, resolveBalance, sendMoney, syncWallet, waitSendConfirmation } from './serviceFunctions';

export function* sendMoneySaga(action) {
  const state = yield select();
  const fromAddress = state.wallet.selectedWalletAddress;
  const toAddress = action.toEthAddress;
  const amount = action.amount;
  const message = action.message;

  const confirmationTask = yield fork(waitConfirmation);
  try {
    // @todo Send message to receiver
    yield call(sendMoney, fromAddress, toAddress, amount);
    yield put(sendMoneySuccess());
  } catch (error) {
    console.log(error);
    yield cancel(confirmationTask);
    yield put(sendMoneyFailed(error));
  }

}

export function* waitConfirmation() {
  const transaction = yield call(waitSendConfirmation);
  yield put(requestTransactionConfirmation(transaction));
}

export function* updateWalletList() {
  const walletsWithoutBalance = yield call(getWallets);
  yield put(walletsListUpdated(walletsWithoutBalance));
  const wallets = yield all(_.map(walletsWithoutBalance, (wallet) => call(resolveBalance, wallet)));
  yield put(walletsListUpdated(wallets));
}

export function* updateWalletBalance(wallet) {
  yield call(syncWallet, wallet);
  yield updateWalletList();
}

