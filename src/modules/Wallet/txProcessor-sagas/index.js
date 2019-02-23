import { all, call } from 'redux-saga/effects';
import { registerProcessor } from './sagas';

/**
 * @desc Root transaction processor saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(registerProcessor),
  ]);
}
