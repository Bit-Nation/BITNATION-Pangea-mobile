// @flow

import { all, takeEvery } from 'redux-saga/effects';
import { onCurrentAccountChange } from './sagas';
import { CURRENT_ACCOUNT_ID_CHANGED } from '../../actions/accounts';

/**
 * @desc Root service container saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    takeEvery(CURRENT_ACCOUNT_ID_CHANGED, onCurrentAccountChange),
  ]);
}
