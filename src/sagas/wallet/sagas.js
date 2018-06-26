// @flow

import {
  call,
  put,
  select,
} from 'redux-saga/effects';
import { BigNumber } from 'bignumber.js';
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
import defaultDB from '../../services/database';
import type { WalletType as DBWallet } from '../../services/database/schemata';
import { convertFromDatabase, convertToDatabase } from '../../utils/mapping/wallet';
import { resolveWallet } from '../../utils/wallet';

/**
 * @desc Update Eth wallet balance to realm.
 * @param {WalletType[]} walletsArray Array of wallets to save in to Realm
 * @param {String} amount Amount to discount from the wallet
 * @param {String} currency Currency of the wallet to update
 * @returns {void}
 */
export function* updateWalletToDb(walletsArray: WalletType[], amount: string, currency: string): Generator<*, *, *> {
  const db = yield defaultDB;
  const walletToSave = resolveWallet(walletsArray, currency);
  if (walletToSave === null) {
    return;
  }
  const walletToDB = convertToDatabase(walletToSave);
  BigNumber.config({ DECIMAL_PLACES: 18 });
  const balanceBNEth = new BigNumber(walletToDB.balance);
  const amountNEth = new BigNumber(amount);
  db.write(() => {
    db.create('Wallet', { name: walletToDB.name, balance: balanceBNEth.minus(amountNEth).toString() }, true);
  });
}

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
      yield call(updateWalletToDb, state.wallet.wallets, amountToSend, state.wallet.selectedWalletCurrency);
      yield put(sendMoneySuccess());
    } catch (error) {
      yield put(sendMoneyFailed(error));
    }
  } else {
    try {
      yield call([walletService, 'sendToken'], fromAddress, toAddress, amountToSend, account.networkType);
      yield put(sendMoneySuccess());
      yield call(updateWalletToDb, state.wallet.wallets, amountToSend, state.wallet.selectedWalletCurrency);
    } catch (error) {
      yield put(sendMoneyFailed(error));
    }
  }
}

/**
 * @desc Gets the wallets saved in realm.
 * @return {DBWallet|null} Realm objects of wallets or null if there is no wallet saved in Realm.
 */
export function* getDbWallets(): Generator<*, *, *> {
  const db = yield defaultDB;
  const results = db.objects('Wallet');
  return yield results;
}

/**
 * @desc Gets the wallets saved in realm.
 * @param {WalletType[]} walletsArray Array of wallets to save in to Realm
 * @returns {void}
 */
export function* saveWalletsToDb(walletsArray: WalletType[]): Generator<*, *, *> {
  const db = yield defaultDB;
  const ethWallet = convertToDatabase(walletsArray[0]);
  const patWallet = convertToDatabase(walletsArray[1]);
  db.write(() => {
    db.create('Wallet', ethWallet);
    db.create('Wallet', patWallet);
  });
}

/**
 * @desc Update the wallet's balance in realm.
 * @param {WalletType[]} walletsArray Array of wallets to be updated in Realm
 * @returns {void}
 */
export function* updateWalletsToDb(walletsArray: WalletType[]): Generator<*, *, *> {
  const db = yield defaultDB;
  const walletEth = resolveWallet(walletsArray, 'ETH');
  const walletPat = resolveWallet(walletsArray, 'PAT');
  if (walletEth === null || walletPat === null) {
    return;
  }
  const walletEthToSave = convertToDatabase(walletEth);
  const walletPatToSave = convertToDatabase(walletPat);

  db.write(() => {
    db.create('Wallet', { name: walletEthToSave.name, balance: walletEthToSave.balance }, true);
    db.create('Wallet', { name: walletPatToSave.name, balance: walletPatToSave.balance }, true);
  });
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
    yield put(walletsListUpdated([]));
    return;
  }

  let walletsWithoutBalance: WalletType[];
  const walletsFromDb: DBWallet[] = yield call(getDbWallets);
  if (walletsFromDb.length === 0) {
    walletsWithoutBalance = yield call([walletService, 'getWallets']);
    yield call(saveWalletsToDb, walletsWithoutBalance);
  } else {
    walletsWithoutBalance = convertFromDatabase(walletsFromDb);
  }
  yield put(walletsListUpdated(walletsWithoutBalance));
  try {
    const wallets = yield call([walletService, 'resolveBalance'], walletsWithoutBalance, account.networkType);
    yield call(updateWalletsToDb, wallets);
    yield put(walletsListUpdated(wallets));
  } catch (error) {
    yield put(walletSyncFailed(walletsWithoutBalance[0].ethAddress, walletsWithoutBalance[0].currency, error));
    yield put(walletSyncFailed(walletsWithoutBalance[1].ethAddress, walletsWithoutBalance[1].currency, error));
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
    yield put(walletSyncFailed(wallet.ethAddress, wallet.currency, new NoWalletServiceError()));
    return;
  }

  try {
    yield call([walletService, 'syncWallet'], wallet);
    yield updateWalletList();
  } catch (error) {
    yield put(walletSyncFailed(wallet.ethAddress, wallet.currency, error));
    console.log(`Wallet balance update failed with error: ${error.toString()}`);
  }
}
