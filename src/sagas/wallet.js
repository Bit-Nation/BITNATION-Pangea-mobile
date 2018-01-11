import { takeEvery, call, put } from 'redux-saga/effects';

import { CREATE_WALLET, CREATE_MNEMONIC, createMnemonic } from '../actions/wallet';

import container from '../services/container';

async function createPrivateKey() {
  return await container.panthalassa.ethereum.utils.createPrivateKey();
}

async function privateKeyToMnemonic(privateKey) {
  return await container.panthalassa.ethereum.utils.privateKeyToMnemonic(privateKey);
}

function* createWallet() {
  const privateKey = yield call(createPrivateKey);
  const mnemonic = yield call(privateKeyToMnemonic, privateKey);
  yield put(createMnemonic(mnemonic));
}

export default function* watchCreateWallet() {
  yield takeEvery(CREATE_WALLET, createWallet);
}
