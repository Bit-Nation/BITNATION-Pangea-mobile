/* eslint-disable */

import { call, put, select, all } from 'redux-saga/effects';
import _ from 'lodash';

import { changeMnemonicValid, mnemonicCreated } from '../../actions/key';
import { updateWalletList } from '../../actions/wallet';
import {
  createPrivateKey, privateKeyToMnemonic, mnemonicToPrivateKey, savePrivateKey,
  verifyMnemonic, removePrivateKey,
} from './serviceFunctions';


export function* createPrivateKeySaga() {
  const privateKey = yield call(createPrivateKey);
  const mnemonic = yield call(privateKeyToMnemonic, privateKey);
  yield put(mnemonicCreated(mnemonic));
}

export function* savePrivateKeySaga() {
  const state = yield select();
  const mnemonic = state.key.enteredMnemonic;
  if (!mnemonic) return;
  const privateKey = yield call(mnemonicToPrivateKey, mnemonic);
  yield call(savePrivateKey, privateKey);

  yield put(updateWalletList());
}

export function* verifyMnemonicSaga() {
  const state = yield select();

  const enteredMnemonic = state.key.enteredMnemonic;
  const mnemonicCorrect = yield verifyMnemonic(enteredMnemonic);
  if (!mnemonicCorrect) {
    yield put(changeMnemonicValid(false));
    return;
  }

  const createdMnemonic = state.key.createdMnemonic;
  if (!createdMnemonic) {
    yield put(changeMnemonicValid(true));
    return;
  }

  const mnemonicAreTheSame = _.isEqual(enteredMnemonic, createdMnemonic);
  yield put(changeMnemonicValid(mnemonicAreTheSame));
}

export function* removeAllPrivateKeysSaga() {
  const state = yield select();

  yield all(_.map(state.wallet.wallets, wallet => removePrivateKey(wallet.ethAddress)));
  yield put(updateWalletList());
}
