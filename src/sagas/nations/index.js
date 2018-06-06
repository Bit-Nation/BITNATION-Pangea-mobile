// @flow

import { all, takeEvery, call } from 'redux-saga/effects';

import { REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION } from '../../actions/nations';
import { joinNation, leaveNation, startDatabaseListening, startNationIndexingWorker } from './sagas';

/**
 * @desc Root modify nation saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    yield takeEvery(REQUEST_JOIN_NATION, joinNation),
    yield takeEvery(REQUEST_LEAVE_NATION, leaveNation),
    yield call(startNationIndexingWorker),
    yield call(startDatabaseListening),
  ]);
}
