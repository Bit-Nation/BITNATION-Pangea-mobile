// @flow

import { select, put } from 'redux-saga/effects';
import { storeVersion } from '../../actions/migration';


/**
 * @desc Start migration.
 * @return {void}
 */
export function* startMigration(): Generator<*, *, any> {
  const { migration } = yield select();
  if (migration.migrationVersion !== '1.1.0') {
    const version = '1.1.0';
    yield put(storeVersion(version));
  }
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
