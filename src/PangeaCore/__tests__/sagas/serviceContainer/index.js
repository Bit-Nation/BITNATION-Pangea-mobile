// @flow

import { all, takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/serviceContainer';
import { onCurrentAccountChange } from '../../../../src/sagas/serviceContainer/sagas';
import { CURRENT_ACCOUNT_ID_CHANGED } from '../../../../src/actions/accounts';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    takeEvery(CURRENT_ACCOUNT_ID_CHANGED, onCurrentAccountChange),
  ]));
});
