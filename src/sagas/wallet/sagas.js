// @flow

import {
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  sendMoneyFailed,
  sendMoneySuccess,
  walletsListUpdated,
  walletSyncFailed,
} from '../../actions/wallet';
import WalletService from '../../services/wallet';
import { getAccount, getCurrentAccountId } from '../accounts/sagas';
import type { SendMoneyAction } from '../../actions/wallet';
import type { WalletType } from '../../types/Wallet';

/**
 * @desc Sends money depending the currency of the wallets on the list.
 * @param {SendMoneyAction} action an Action
 * @returns {void}
 */
export function* sendMoneySaga(action: SendMoneyAction): Generator<*, *, *> {
  const state = yield select();
  const fromAddress = state.wallet.selectedWalletAddress;
  const toAddress = action.toEthAddress;
  const amountToSend = action.amount;
  const currentAccountId: string = yield call(getCurrentAccountId);
  const account = yield getAccount(currentAccountId);
  if (state.wallet.selectedWalletCurrency === 'ETH') {
    try {
      yield call(WalletService.sendMoney, fromAddress, toAddress, amountToSend, account.networkType);
      yield put(sendMoneySuccess());
    } catch (error) {
      yield put(sendMoneyFailed(error));
    }
  } else {
    try {
      yield call(WalletService.sendToken, fromAddress, toAddress, amountToSend, account.networkType);
      yield put(sendMoneySuccess());
    } catch (error) {
      yield put(sendMoneyFailed(error));
    }
  }
}

/**
 * @desc Updates the balance in the wallets on the list.
 * @returns {void}
 */
export function* updateWalletList(): Generator<*, *, *> {
  const currentAccountId: string = yield call(getCurrentAccountId);
  const account = yield getAccount(currentAccountId);

  const walletsWithoutBalance = yield call(WalletService.getWallets);
  yield put(walletsListUpdated(walletsWithoutBalance));
  // @todo Don't fail if only one fail
  try {
    const wallets = yield call(WalletService.resolveBalance, walletsWithoutBalance, account.networkType);
    yield put(walletsListUpdated(wallets));
  } catch (error) {
    yield put(walletSyncFailed(walletsWithoutBalance[0].ethAddress, error));
    console.log(`Wallet list update failed with error: ${error.toString()}`);
  }
}

/**
 * @desc Updates the balance in the wallet passed as parameter.
 * @param {WalletType} wallet Wallet to be updated
 * @returns {void}
 */
export function* updateWalletBalance(wallet: WalletType): Generator<*, *, *> {
  try {
    yield call(WalletService.syncWallet, wallet);
    yield updateWalletList();
  } catch (error) {
    yield put(walletSyncFailed(wallet.ethAddress, error));
    console.log(`Wallet balance update failed with error: ${error.toString()}`);
  }
}

