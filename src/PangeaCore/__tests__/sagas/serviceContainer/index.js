// @flow

import { all, takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../sagas/serviceContainer-sagas';
import { onCurrentAccountChange } from '../../../sagas/serviceContainer-sagas/sagas';
import { CURRENT_ACCOUNT_ID_CHANGED } from '@pangea/accounts/accounts-actions';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    takeEvery(CURRENT_ACCOUNT_ID_CHANGED, onCurrentAccountChange),
  ]));
});
