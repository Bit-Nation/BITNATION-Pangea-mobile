import { all } from 'redux-saga/effects';

import accounts from './accounts';

export default function* rootSaga() {
  yield all([
    accounts(),
  ]);
}
