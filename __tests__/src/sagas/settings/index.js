// @flow

import { all, call, takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/settings';
import { loadSettings, saveSettings, startDatabaseListening } from '../../../../src/sagas/settings/sagas';
import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../../../src/actions/settings';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    call(startDatabaseListening),
    takeEvery(LOAD_SETTINGS, loadSettings),
    takeEvery(SAVE_SETTINGS, saveSettings),
  ]));
});
