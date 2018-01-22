import { all, call, put } from 'redux-saga/effects';
import _ from 'lodash';

import { walletsListUpdated } from '../../actions/wallet';
import { getWallets, resolveBalance, syncWallet } from './serviceFunctions';

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

