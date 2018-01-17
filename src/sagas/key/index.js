import { all, takeEvery } from 'redux-saga/effects';

import { CREATE_PRIVATE_KEY, SAVE_PRIVATE_KEY } from '../../actions/key';
import { createPrivateKeySaga, savePrivateKeySaga } from './sagas';


function* watchCreateWallet() {
  yield takeEvery(CREATE_PRIVATE_KEY, createPrivateKeySaga);
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