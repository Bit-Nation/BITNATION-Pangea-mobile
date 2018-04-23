import { all, call, takeEvery } from 'redux-saga/effects';
import { doneAccountEditing, listenForDatabaseUpdates, login, logout } from './sagas';
import { LOGIN, LOGOUT } from '../../actions/accounts';
import { DONE_ACCOUNT_EDITING } from '../../actions/profile';

/**
 * @desc Root accounts saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(listenForDatabaseUpdates),
    yield takeEvery(LOGIN, login),
    yield takeEvery(LOGOUT, logout),
    yield takeEvery(DONE_ACCOUNT_EDITING, doneAccountEditing),
  ]);
}
