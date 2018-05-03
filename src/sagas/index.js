import { all, call } from 'redux-saga/effects';

import accounts from './accounts';
import navigation from './navigation';
import key from './key';

/**
 * @desc Root saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(accounts),
    call(navigation),
    call(key),
  ]);
}
