import { all, call } from 'redux-saga/effects';
import { registerSendMoneyProcessor } from './sagas';

/**
 * @desc Root transaction processor saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(registerSendMoneyProcessor),
  ]);
}
