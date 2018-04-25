import { all, call, takeEvery } from 'redux-saga/effects';
import { checkPinCode, listenForDatabaseUpdates, login, logout } from './sagas';
import { CHECK_PIN_CODE, LOGIN, LOGOUT } from '../../actions/accounts';

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
  ]);
}
