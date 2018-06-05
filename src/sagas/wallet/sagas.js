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
import { getAccount, getCurrentAccountId } from '../accounts/sagas';
import type { SendMoneyAction } from '../../actions/wallet';
import type { WalletType } from '../../types/Wallet';
import ServiceContainer from '../../services/container';
import { NoWalletServiceError } from '../../global/errors/services';

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
  const { walletService } = ServiceContainer.instance;
  if (walletService === null) {
    yield put(sendMoneyFailed(new NoWalletServiceError()));
    return;
  }

  if (state.wallet.selectedWalletCurrency === 'ETH') {
    try {
      yield call([walletService, 'sendMoney'], fromAddress, toAddress, amountToSend);
      yield put(sendMoneySuccess());
    } catch (error) {
      yield put(sendMoneyFailed(error));
    }
  } else {
    try {
      yield call([walletService, 'sendToken'], fromAddress, toAddress, amountToSend, account.networkType);
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
  const { walletService } = ServiceContainer.instance;
  if (walletService === null) {
    return;
  }

  const walletsWithoutBalance = yield call([walletService, 'getWallets']);
  yield put(walletsListUpdated(walletsWithoutBalance));
  try {
    const wallets = yield call([walletService, 'resolveBalance'], walletsWithoutBalance, account.networkType);
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
  const { walletService } = ServiceContainer.instance;
  if (walletService === null) {
    yield put(walletSyncFailed(wallet.ethAddress, new NoWalletServiceError()));
    return;
  }

  try {
    yield call([walletService, 'syncWallet'], wallet);
    yield updateWalletList();
  } catch (error) {
    yield put(walletSyncFailed(wallet.ethAddress, error));
    console.log(`Wallet balance update failed with error: ${error.toString()}`);
  }
}

