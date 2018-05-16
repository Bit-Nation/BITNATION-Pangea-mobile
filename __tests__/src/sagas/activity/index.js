import { takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/activity';
import { addNewMessageSaga, fetchMessagesSaga, watchNewMessages } from '../../../../src/sagas/activity/sagas';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    watchStartFetchMessages(),
    watchNewMessages(),
    watchAddNewMessage(),
  ]));
});
