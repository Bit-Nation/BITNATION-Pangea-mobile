// @flow

import { all, call, takeEvery } from 'redux-saga/effects';

import { ADD_NEW_MESSAGE } from '../activity-actions';
import {
  addNewMessageSaga,
  startDatabaseListening,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    call(startDatabaseListening),
    takeEvery(ADD_NEW_MESSAGE, addNewMessageSaga),
  ]);
}
