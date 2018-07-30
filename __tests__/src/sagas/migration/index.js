// @flow

import { takeEvery, all } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/migration';
import { START_MIGRATION, IS_MIGRATION } from '../../../../src/actions/migration';
import { startMigration, isMigration } from '../../../../src/sagas/migration/sagas';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    takeEvery(START_MIGRATION, startMigration),
    takeEvery(IS_MIGRATION, isMigration),
  ]));
});
