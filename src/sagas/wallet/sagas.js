/* eslint-disable */

import { call, put, select } from 'redux-saga/effects';
import { sendMoneyFailed, sendMoneySuccess, walletsListUpdated, walletSyncFailed } from '../../actions/wallet';
import WalletService from '../../services/wallet';
import {getAccount, getCurrentAccountId} from '../accounts/sagas';
// import { checkConnection } from '../connection';

export function* sendMoneySaga(action) {
  const state = yield select();
  const fromAddress = state.wallet.selectedWalletAddress;
  const toAddress = action.toEthAddress;
  const amount = action.amount;

  try {
    // yield call(checkConnection);
    yield call(EthereumService.sendMoney, fromAddress, toAddress, amount);
    yield put(sendMoneySuccess());
  } catch (error) {
    console.log(error);
    yield put(sendMoneyFailed(error));
  }
}

export function* updateWalletList() {
  let currentAccountId: string | null;
  currentAccountId = yield call(getCurrentAccountId);
  const account = yield getAccount(currentAccountId);

  const walletsWithoutBalance = yield call(WalletService.getWallets);
  yield put(walletsListUpdated(walletsWithoutBalance));
  // @todo Don't fail if only one fail
  try {
    const wallets = yield call(WalletService.resolveBalance, walletsWithoutBalance, account.networkType);
    yield put(walletsListUpdated(wallets));
  } catch (error) {
    console.log(`Wallet list update failed with error: ${error.toString()}`);
  }
}

export function* updateWalletBalance(wallet) {
  try {
    // yield call(checkConnection);
    yield call(WalletService.syncWallet, wallet);
    yield updateWalletList();
  } catch (error) {
    console.log(`Wallet balance update failed with error: ${error.toString()}`);
  }
}

