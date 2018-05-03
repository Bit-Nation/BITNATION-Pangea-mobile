import { all, call } from 'redux-saga/effects';

import rootSaga from '../../../src/sagas/index';
import accounts from '../../../src/sagas/accounts';
import navigation from '../../../src/sagas/navigation';
import key from '../../../src/sagas/key';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    call(accounts),
    call(navigation),
    call(key),
  ]));
});
