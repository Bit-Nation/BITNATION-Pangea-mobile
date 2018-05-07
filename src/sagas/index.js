import { all, call } from 'redux-saga/effects';

import accounts from './accounts';
import navigation from './navigation';
import wallet from './wallet';

/**
 * @desc Root saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(accounts),
    call(navigation),
    call(wallet),
  ]);
}
