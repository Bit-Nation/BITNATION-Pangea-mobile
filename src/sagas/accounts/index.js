import { all, call, takeEvery } from 'redux-saga/effects';
import {
  checkPassword, checkPinCode, listenForDatabaseUpdates, login, logout, savePassword,
  savePinCode,
} from './sagas';
import { CHECK_PASSWORD, CHECK_PIN_CODE, LOGIN, LOGOUT, SAVE_PASSWORD, SAVE_PIN_CODE } from '../../actions/accounts';

/**
 * @desc Root accounts saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(listenForDatabaseUpdates),
    yield takeEvery(LOGIN, login),
    yield takeEvery(LOGOUT, logout),
    yield takeEvery(CHECK_PIN_CODE, checkPinCode),
    yield takeEvery(CHECK_PASSWORD, checkPassword),
    yield takeEvery(SAVE_PIN_CODE, savePinCode),
    yield takeEvery(SAVE_PASSWORD, savePassword),
  ]);
}
