// @flow

import { takeEvery } from 'redux-saga/effects';

import rootSaga from '../../navigation-sagas';
import { launchCorrectFlow } from '../../navigation-sagas/sagas';
import { CURRENT_ACCOUNT_ID_CHANGED } from '@pangea/accounts/accounts-actions';
import { START_NAVIGATION } from '../../navigation-actions';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(takeEvery([CURRENT_ACCOUNT_ID_CHANGED, START_NAVIGATION], launchCorrectFlow));
});
