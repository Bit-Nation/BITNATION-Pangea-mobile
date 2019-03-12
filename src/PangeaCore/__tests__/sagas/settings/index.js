// @flow

import { all, call, takeEvery } from 'redux-saga/effects';

import rootSaga from '../../../sagas/settings-sagas';
import { loadSettings, saveSettings, startDatabaseListening } from '../../../sagas/settings-sagas/sagas';
import { LOAD_SETTINGS, SAVE_SETTINGS } from '@pangea/settings/settings-actions';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    call(startDatabaseListening),
    takeEvery(LOAD_SETTINGS, loadSettings),
    takeEvery(SAVE_SETTINGS, saveSettings),
  ]));
});
