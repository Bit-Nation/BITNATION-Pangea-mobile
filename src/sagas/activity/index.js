import { all, takeEvery } from 'redux-saga/effects';

import { ADD_NEW_MESSAGE } from '../../actions/activity';
import {
  addNewMessageSaga,
  watchNewMessages,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    watchNewMessages(),
    takeEvery(ADD_NEW_MESSAGE, addNewMessageSaga),
  ]);
}
