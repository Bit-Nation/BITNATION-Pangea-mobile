// @flow

import { all, takeEvery } from 'redux-saga/effects';

import { DELETE_NATION_DRAFT, SAVE_NATION_DRAFT, SUBMIT_NATION } from '../../actions/modifyNation';
import { deleteDraftSaga, saveDraftSaga, submitNationSaga } from './sagas';

/**
 * @desc Root modify nation saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    takeEvery(SAVE_NATION_DRAFT, saveDraftSaga),
    takeEvery(DELETE_NATION_DRAFT, deleteDraftSaga),
    takeEvery(SUBMIT_NATION, submitNationSaga),
  ]);
}
