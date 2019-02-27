// @flow

import { call } from 'redux-saga/effects';
import defaultDB from '@pangea/database';
import { getCurrentAccount } from '@pangea/accounts/accounts-sagas';
import { launchLoggedInFlow } from '@pangea/navigation/navigation-sagas';

/**
 * @desc Start migration.
 * @return {void}
 */
export function* startMigration(): Generator<*, *, any> {
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
