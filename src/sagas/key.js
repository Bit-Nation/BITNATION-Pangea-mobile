import { all, takeEvery, call, put, select } from 'redux-saga/effects';

import {
  CREATE_PRIVATE_KEY, mnemonicCreated, SAVE_PRIVATE_KEY
} from '../actions/key';
import {
  updateWalletList
} from '../actions/wallet';
import container from '../services/container';
import { compressMnemonic } from '../utils/key';

async function createPrivateKey() {
  return await container.panthalassa.ethereum.utils.createPrivateKey();
}

async function privateKeyToMnemonic(privateKey) {
  return await container.panthalassa.ethereum.utils.privateKeyToMnemonic(privateKey);
}

async function mnemonicToPrivateKey(mnemonic) {
  return await container.panthalassa.ethereum.utils.mnemonicToPrivateKey(mnemonic);
}

async function savePrivateKey(privateKey) {
  return await container.panthalassa.ethereum.utils.savePrivateKey(privateKey);
}

function* createPrivateKey() {
  const privateKey = yield call(createPrivateKey);
  const mnemonic = yield call(privateKeyToMnemonic, privateKey);
  yield put(mnemonicCreated(mnemonic));
}

function* watchCreateWallet() {
  yield takeEvery(CREATE_PRIVATE_KEY, createPrivateKey);
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

  yield put(updateWalletList);
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

