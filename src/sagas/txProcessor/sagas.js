// @flow

import { call, put, take } from 'redux-saga/effects';
import type { Realm } from 'realm';
import _ from 'lodash';

import { currentAccountBasedUpdate } from '../accounts/sagas';
import type { TransactionJobType } from '../../services/database/schemata';
import ServiceContainer from '../../services/container';
import { SERVICES_CREATED } from '../../actions/serviceContainer';
import { NoTxProcessorError } from '../../global/errors/services';

/**
 * @desc Function that creates Realm results fetching transactions for specific account.
 * @param {Realm} db Realm instance.
 * @param {string|null} accountId Id of account to fetch transactions or null.
 * @return {Realm.Results<TransactionJobType>|null} Realm results fetching transactions for specified account or null if not applicable.
 */
export function buildTransactionsResults(db: Realm, accountId: string | null): Realm.Results<TransactionJobType> {
  if (accountId === null) {
    return null;
  }
  return db.objects('TransactionJob').filtered(`accountId == '${accountId}'`);
}

export function* onCurrentAccountChange(
  collection: Realm.Collection<TransactionJobType>,
  changes: Realm.CollectionChangeSet<TransactionJobType>,
): Generator<*, *, *> {
  let { txProcessor } = ServiceContainer.instance;
  if (txProcessor === null) {
    yield take(SERVICES_CREATED);
  }
  ({ txProcessor } = ServiceContainer.instance);
  if (txProcessor === null) {
    // TxProcessor should be present now, because we waited for SERVICES_CREATED action.
    // So, if it's not present then something critical happened.
    throw new NoTxProcessorError();
  }

  if (changes == null || (_.isEmpty(changes.deletions) && _.isEmpty(changes.modifications) && _.isEmpty(changes.insertions))) {
    _.forEach(collection, (tx) => {
      txProcessor.processTransaction(tx, 'initial');
    });
    return;
  }

  _.forEach(changes.insertions, (index) => {
    txProcessor.processTransaction(collection[index], 'added');
  });

  _.forEach(changes.insertions, (index) => {
    txProcessor.processTransaction(collection[index], 'modified');
  });
}

/**
 * @desc Generator to be called to register transaction processing based on current account change.
 * @return {void}
 */
export function* registerProcessor(): Generator<*, *, *> {
  yield call(
    currentAccountBasedUpdate,
    buildTransactionsResults,
    onCurrentAccountChange,
  );
}
