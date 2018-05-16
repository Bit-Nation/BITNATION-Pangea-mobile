// @flow

import { all, call } from 'redux-saga/effects';

import accounts from './accounts';
import activity from './activity';
import navigation from './navigation';
import key from './key';
import settings from './settings';

/**
 * @desc Root saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    call(accounts),
    call(activity),
    call(navigation),
    call(key),
    call(settings),
  ]);
}
