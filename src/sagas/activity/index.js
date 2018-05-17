/* eslint-disable */

import { all, takeEvery } from 'redux-saga/effects';

import { ADD_NEW_MESSAGE, START_FETCH_MESSAGES } from '../../actions/activity';
import { addNewMessageSaga, fetchMessagesSaga, watchNewMessages } from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    watchNewMessages(),
    takeEvery(START_FETCH_MESSAGES, fetchMessagesSaga),
    takeEvery(ADD_NEW_MESSAGE, addNewMessageSaga)
  ]);
}
