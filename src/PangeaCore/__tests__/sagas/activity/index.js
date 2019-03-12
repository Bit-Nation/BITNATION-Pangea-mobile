// @flow

import { all, call, takeEvery } from 'redux-saga/effects';

import rootSaga from '@pangea/activity/activity-sagas';
import { addNewMessageSaga, startDatabaseListening } from '@pangea/activity/activity-sagas/sagas';
import { ADD_NEW_MESSAGE } from '@pangea/activity/activity-actions';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    call(startDatabaseListening),
    takeEvery(ADD_NEW_MESSAGE, addNewMessageSaga),
  ]));
});
