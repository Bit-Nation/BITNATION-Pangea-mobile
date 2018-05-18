/* eslint-disable */

import { all, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { sendMoneyFailed, sendMoneySuccess, walletsListUpdated, walletSyncFailed } from '../../actions/wallet';
import WalletService from '../../services/wallet';
import factory from '../../services/ethereum';
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
/*
function* resolveWalletBalance(walletWithoutBalance) {
  try {
    // yield call(checkConnection);
    const wallet = yield call(WalletService.resolveBalance, walletWithoutBalance);
    console.log(wallet);
    return wallet;
  } catch (error) {
    yield put(walletSyncFailed(walletWithoutBalance.ethAddress, error));
    throw error;
  }
} */
function resolveWalletsBalance(wallets) {
  const walletKey = '0xfc08cE21098C58F18a459C96aB4ef63036164BC9';
  const EthJs = factory({ private_key: walletKey, provider_type: 'rinkeby' });

  console.log('Creó Factory');

  console.log('===== > Wallets with balance resolveBalance-Inicio', EthJs);

  let ethWallet = _.filter(wallets, { currency: 'ETH' });
  try {
    ethWallet = call(EthJs.service.getBalance());
  } catch (error) {
    throw error;
  }
  console.log('===== > Wallets with balance resolveBalance', error);
  return ethWallet;
}

export function* updateWalletList() {
  const walletsWithoutBalance = yield call(WalletService.getWallets);
  yield put(walletsListUpdated(walletsWithoutBalance));
  console.log('Wallet with no Balance:', walletsWithoutBalance );
  // @todo Don't fail if only one fail
  try {
    // const wallets = yield all(_.map(walletsWithoutBalance, wallet => call(EthereumService.getBalance, wallet)));
    console.log('Entro al TRY');
    const wallets = yield call(WalletService.resolveBalance, walletsWithoutBalance);
    console.log('===== > Wallets with balance', wallets);
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

