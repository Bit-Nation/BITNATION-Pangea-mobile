import { all, takeEvery, call, put, select } from 'redux-saga/effects';

import {
  CREATE_PRIVATE_KEY, mnemonicCreated, SAVE_PRIVATE_KEY
} from '../actions/key';
import {
  updateWalletList
} from '../actions/wallet';
import containerPromise from '../services/container';
import { compressMnemonic } from '../utils/key';

async function createPrivateKey() {
  const container = await containerPromise;
  return await container.eth.utils.createPrivateKey();
}

async function privateKeyToMnemonic(privateKey) {
  const container = await containerPromise;
  return await container.eth.utils.privateKeyToMnemonic(privateKey);
}

async function mnemonicToPrivateKey(mnemonic) {
  const container = await containerPromise;
  return await container.eth.utils.mnemonicToPrivateKey(mnemonic);
}

async function savePrivateKey(privateKey) {
  const container = await containerPromise;
  return await container.eth.utils.savePrivateKey(privateKey);
}

function* createPrivateKeySaga() {
  const privateKey = yield call(createPrivateKey);
  const mnemonic = yield call(privateKeyToMnemonic, privateKey);
  yield put(mnemonicCreated(mnemonic));
}

function* watchCreateWallet() {
  yield takeEvery(CREATE_PRIVATE_KEY, createPrivateKeySaga);
}

function* savePrivateKeySaga() {
  const state = yield select();
  const mnemonicArray = state.key.createdMnemonic;
  if (!mnemonicArray) {
    return;
  }
  const mnemonic = compressMnemonic(mnemonicArray);
  const privateKey = yield call(mnemonicToPrivateKey, mnemonic);
  yield call(savePrivateKey, privateKey);

  yield put(updateWalletList());
}

function* watchSavePrivateKey() {
  yield takeEvery(SAVE_PRIVATE_KEY, savePrivateKeySaga);
}

export default function* rootSaga() {
  yield all([
    watchCreateWallet(),
    watchSavePrivateKey(),
  ]);
}

