// @flow

import { all, takeEvery } from 'redux-saga/effects';
import { SERVICES_CREATED } from '../../serviceContainer/serviceContainer-actions';
import { subscribeToUIAPI } from './uiAPI';

/**
 * @desc Root upstream saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    yield takeEvery(SERVICES_CREATED, subscribeToUIAPI),
  ]);
}
