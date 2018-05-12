/* eslint-disable */

import { all, takeEvery } from 'redux-saga/effects';

import { ADD_NEW_MESSAGE, START_FETCH_MESSAGES } from '../../actions/activity';
import { addNewMessageSaga, fetchMessagesSaga, watchNewMessages } from './sagas';

function* watchStartFetchMessages() {
  yield takeEvery(START_FETCH_MESSAGES, fetchMessagesSaga);
}

function* watchAddNewMessage() {
  yield takeEvery(ADD_NEW_MESSAGE, addNewMessageSaga);
}

export default function* rootSaga() {
  yield all([
    watchStartFetchMessages(),
    watchNewMessages(),
    watchAddNewMessage(),
  ]);
}
