import { all, call, put } from 'redux-saga/effects';
import _ from 'lodash';

import { walletsListUpdated } from '../../actions/wallet';
import { convertWallets } from '../../utils/wallet';
import { getWallets, resolveBalance, syncWallet } from './serviceFunctions';


export function* updateWalletList() {
  const walletsObject = yield call(getWallets);
  const walletsWithoutBalance = convertWallets(walletsObject);
  const wallets = yield all(_.map(walletsWithoutBalance, (wallet) => call(resolveBalance, wallet)));
  yield put(walletsListUpdated(wallets));
}

export function* updateWalletBalance(wallet) {
  yield call(syncWallet, wallet);
  yield updateWalletList();
}



