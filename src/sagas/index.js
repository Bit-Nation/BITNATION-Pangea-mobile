import { all } from 'redux-saga/effects';
import wallet from './wallet';
import profile from './profile';

export default function* rootSaga() {
  yield all([
    wallet(),
    profile()
  ]);
}
