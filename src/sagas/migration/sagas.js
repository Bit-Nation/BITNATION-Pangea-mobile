// @flow

import { select } from 'redux-saga/effects';

/**
 * @desc Start migration.
 * @return {void}
 */
export function* startMigration(): Generator<*, *, *> {
  // @todo All migration functions will go here
}

/**
 * @desc Check if migration is required.
 * @return {void}
 */
export function* isMigration(): Generator<*, *, any> {
  const { migration } = yield select();
  if (migration.migrationVersion !== '1.1.0') {
    return true;
  }
  return false;
}
