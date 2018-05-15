import { all, call } from 'redux-saga/effects';

import accounts from './accounts';
import navigation from './navigation';
import key from './key';
import settings from './settings';
import wallet from './wallet';

/**
 * @desc Root saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(accounts),
    call(navigation),
    call(key),
    call(settings),
    call(wallet),
  ]);
}
