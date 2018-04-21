import { all, takeEvery } from 'redux-saga/effects';
import { listenForDatabaseUpdates, login, logout } from './sagas';
import { LOGIN, LOGOUT } from '../../actions/accounts';

export default function* rootSaga() {
  yield all([
    listenForDatabaseUpdates(),
    yield takeEvery(LOGIN, login),
    yield takeEvery(LOGOUT, logout),
  ]);
}
