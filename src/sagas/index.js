import { all } from 'redux-saga/effects';

import wallet from './wallet';
import key from './key';
import profile from './profile';
// import nations from './nations';

export default function* rootSaga() {
  yield all([
    wallet(),
    profile(),
    // nations(),
    key(),
  ]);
}
