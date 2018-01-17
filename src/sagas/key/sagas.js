import { compressMnemonic } from '../../utils/key';
import { call, put, select } from 'redux-saga/effects';
import { mnemonicCreated } from '../../actions/key';
import { updateWalletList } from '../../actions/wallet';
import { createPrivateKey, privateKeyToMnemonic, mnemonicToPrivateKey, savePrivateKey } from './serviceFunctions';

export function* createPrivateKeySaga() {
  const privateKey = yield call(createPrivateKey);
  const mnemonic = yield call(privateKeyToMnemonic, privateKey);
  yield put(mnemonicCreated(mnemonic));
}

export function* savePrivateKeySaga() {
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