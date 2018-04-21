import { all, takeEvery } from 'redux-saga/effects';
import { listenForDatabaseUpdates, login } from './sagas';
import { LOGIN } from '../../actions/accounts';

export default function* rootSaga() {
  yield all([
    listenForDatabaseUpdates(),
    yield takeEvery(LOGIN, login),
  ]);
}
