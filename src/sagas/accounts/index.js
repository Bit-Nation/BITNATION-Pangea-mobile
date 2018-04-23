import { all, call, takeEvery } from 'redux-saga/effects';
import { doneAccountEditing, listenForDatabaseUpdates, login, logout } from './sagas';
import { LOGIN, LOGOUT } from '../../actions/accounts';
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
  ]);
}
