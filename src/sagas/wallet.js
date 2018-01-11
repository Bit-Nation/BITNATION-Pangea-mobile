import { all, takeEvery, call, put, select } from 'redux-saga/effects';

import { UPDATE_WALLET_LIST, walletsListUpdated } from '../actions/wallet';

import container from '../services/container';
import { convertWallets } from '../utils/wallet';

async function getWallets() {
  return await container.panthalassa.ethereum.utils.allKeyPairs();
}

function* updateWalletList() {
  const walletsObject = yield call(getWallets);
  const wallets = convertWallets(walletsObject);
  yield put(walletsListUpdated(wallets));
}

function* watchUpdateWalletList() {
  yield takeEvery(UPDATE_WALLET_LIST, updateWalletList);
}

export default function* rootSaga() {
  yield all([
    watchUpdateWalletList(),
  ]);
}

