// @flow

import { select, call } from 'redux-saga/effects';
import defaultDB from '../../services/database';
import { getCurrentAccount } from '../accounts/sagas';
import { launchLoggedInFlow } from '../navigation/sagas';

/**
 * @desc Start migration.
 * @return {void}
 */
export function* startMigration(): Generator<*, *, *> {
  // @todo All migration functions will go here
  const db = yield defaultDB;
  const currentAccount = yield getCurrentAccount();
  db.write(() => {
    db.create('Account', { ...currentAccount, lastMigrationVersion: '1.1.0' }, true);
  });

  yield call(launchLoggedInFlow);
}

/**
 * @desc Check if migration is required.
 * @return {void}
 */
export function* isMigration(): Generator<*, *, any> {
  const currentAccount = yield getCurrentAccount();
  if (currentAccount.lastMigrationVersion !== '1.1.0') {
    return true;
  }
  return false;
}
