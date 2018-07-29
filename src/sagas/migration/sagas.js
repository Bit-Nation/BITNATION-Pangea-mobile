// @flow

import { call, select, put } from 'redux-saga/effects';
import _ from 'lodash';
// import type { Migration } from '../../types/Migration';

/**
 * @desc Start migration.
 * @return {void}
 */
export function* startMigration(): Generator<*, *, *> {
  // @todo All migration functions will go here
}

/**
 * @desc Check if migration is needed or not.
 * @return {boolean}
 */
export function* isMigration(): Generator<*, *, any> {
  const { migration } = yield select();
  if (migration.migrationVersion !== '1.1.0') {
    return true;
  }
  return false;
}
