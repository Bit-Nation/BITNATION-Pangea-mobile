import { all } from 'redux-saga/effects';
import wallet from './wallet';

export default function* rootSaga() {
  yield all([
    wallet(),
  ]);
}
