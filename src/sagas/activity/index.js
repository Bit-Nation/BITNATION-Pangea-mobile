import { all, takeEvery } from 'redux-saga/effects';

import { ADD_NEW_MESSAGE } from '../../actions/activity';
import {
  addNewMessageSaga,
  startDatabaseListening,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    startDatabaseListening(),
    takeEvery(ADD_NEW_MESSAGE, addNewMessageSaga),
  ]);
}
