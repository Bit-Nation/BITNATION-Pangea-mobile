import { all, takeEvery } from 'redux-saga/effects';

import { CREATE_PRIVATE_KEY, SAVE_PRIVATE_KEY, VALIDATE_ENTERED_MNEMONIC } from '../../actions/key';
import { createPrivateKeySaga, savePrivateKeySaga, verifyMnemonicSaga } from './sagas';

function* watchCreateWallet() {
  yield takeEvery(CREATE_PRIVATE_KEY, createPrivateKeySaga);
}

function* watchSavePrivateKey() {
  yield takeEvery(SAVE_PRIVATE_KEY, savePrivateKeySaga);
}

function* watchVerifyMnemonic() {
  yield takeEvery(VALIDATE_ENTERED_MNEMONIC, verifyMnemonicSaga);
}

export default function* rootSaga() {
  yield all([
    watchCreateWallet(),
    watchSavePrivateKey(),
    watchVerifyMnemonic(),
  ]);
}