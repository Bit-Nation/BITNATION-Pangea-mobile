import { all, call, takeEvery } from 'redux-saga/effects';
import {
  doneAccountEditing,
  listenForDatabaseUpdates,
  login,
  logout,
  checkPasswordSaga,
  checkPinCodeSaga,
  savePasswordSaga,
  savePinCodeSaga,
} from './sagas';
import {
  LOGIN,
  LOGOUT,
  CHECK_PASSWORD,
  CHECK_PIN_CODE,
  SAVE_PASSWORD,
  SAVE_PIN_CODE,
} from '../../actions/accounts';
import { UPDATE_ACCOUNT } from '../../actions/profile';

/**
 * @desc Root accounts saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(listenForDatabaseUpdates),
    yield takeEvery(LOGIN, login),
    yield takeEvery(LOGOUT, logout),
    yield takeEvery(UPDATE_ACCOUNT, doneAccountEditing),
    yield takeEvery(CHECK_PIN_CODE, checkPinCodeSaga),
    yield takeEvery(CHECK_PASSWORD, checkPasswordSaga),
    yield takeEvery(SAVE_PIN_CODE, savePinCodeSaga),
    yield takeEvery(SAVE_PASSWORD, savePasswordSaga),
  ]);
}
