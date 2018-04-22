import { takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/navigation';
import { launchCorrectFlow } from '../../../../src/sagas/navigation/sagas';
import { CURRENT_ACCOUNT_ID_CHANGED } from '../../../../src/actions/accounts';
import { START_NAVIGATION } from '../../../../src/actions/navigation';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(takeEvery([CURRENT_ACCOUNT_ID_CHANGED, START_NAVIGATION], launchCorrectFlow));
});
