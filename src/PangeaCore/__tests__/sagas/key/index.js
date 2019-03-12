// @flow

import { takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../sagas/key-sagas';
import { VALIDATE_ENTERED_MNEMONIC } from '@pangea/key/key-actions';
import { validateEnteredMnemonic } from '../../../sagas/key-sagas/sagas';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(takeEvery(VALIDATE_ENTERED_MNEMONIC, validateEnteredMnemonic));
});
