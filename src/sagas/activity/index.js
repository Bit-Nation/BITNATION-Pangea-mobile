import { all, takeEvery } from 'redux-saga/effects';

import { START_FETCH_MESSAGES } from '../../actions/activity';
import { fetchMessagesSaga } from './sagas';

function* watchStartFetchMessages() {
  yield takeEvery(START_FETCH_MESSAGES, fetchMessagesSaga);
}

export default function* rootSaga() {
  yield all([
    watchStartFetchMessages(),
  ]);
}