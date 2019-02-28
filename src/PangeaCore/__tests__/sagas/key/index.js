// @flow

import { takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/key';
import { VALIDATE_ENTERED_MNEMONIC } from '../../../../src/actions/key';
import { validateEnteredMnemonic } from '../../../../src/sagas/key/sagas';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(takeEvery(VALIDATE_ENTERED_MNEMONIC, validateEnteredMnemonic));
});
