// @flow

import { all, call, takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/activity';
import { addNewMessageSaga, startDatabaseListening } from '../../../../src/sagas/activity/sagas';
import { ADD_NEW_MESSAGE } from '../../../../src/actions/activity';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    call(startDatabaseListening),
    takeEvery(ADD_NEW_MESSAGE, addNewMessageSaga),
  ]));
});
