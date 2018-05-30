// @flow

import { all, call } from 'redux-saga/effects';

import rootSaga from '../../../src/sagas/index';
import accounts from '../../../src/sagas/accounts';
import activity from '../../../src/sagas/activity';
import navigation from '../../../src/sagas/navigation';
import key from '../../../src/sagas/key';
import settings from '../../../src/sagas/settings';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    call(accounts),
    call(activity),
    call(navigation),
    call(key),
    call(settings),
  ]));
});
