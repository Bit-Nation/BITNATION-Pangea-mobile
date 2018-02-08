import { call, put } from 'redux-saga/effects';

import { fetchMessages } from './serviceFunctions';
import { doneFetchMessages } from '../../actions/activity';

export function* fetchMessagesSaga(action) {
  const messages = yield call(fetchMessages, action.limit);
  yield put(doneFetchMessages(messages));
}
