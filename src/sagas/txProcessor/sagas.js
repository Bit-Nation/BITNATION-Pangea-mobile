// @flow

import { call, put } from 'redux-saga/effects';
import type { Realm } from 'realm';
import _ from 'lodash';

import { currentAccountBasedUpdate } from '../accounts/sagas';
import type { TransactionJobType } from '../../services/database/schemata';

/**
 * @desc Function that creates Realm results builder that creates results fetching transactions of specific type for specific account.
 * @param {string} txType Type of transactions to be fetched.
 * @return {function} Realm results builder that is fetching transactions of specific type for specific account.
 */
export function transactionsResultsBuilderFactory(txType: string): ((db: Realm, accountId: string | null) => Realm.Results<TransactionJobType>) {
  return (db: Realm, accountId: string | null) => {
    if (accountId === null) {
      return null;
    }
    return db.objects('TransactionJob').filtered(`account.id == '${accountId}' AND type == '${txType}'`);
  };
}

type TxProcessor = (tx: TransactionJobType, changeType: 'initial' | 'added' | 'modified') => void;

/**
 * @desc Generator to be called on database change. Used to update settings.
 * @param {string} txType Type of transactions to be fetched.
 * @param {TxProcessor} processor Function or generator that takes transaction and type of change.
 * @return {void}
 */
export function* registerProcessor(txType: string, processor: TxProcessor): Generator<*, *, *> {
  yield call(
    currentAccountBasedUpdate,
    transactionsResultsBuilderFactory(txType),
    (collection: Realm.Collection<TransactionJobType>, changes: Realm.CollectionChangeSet<TransactionJobType>) => function*() {
      if (changes == null || (_.isEmpty(changes.deletions) && _.isEmpty(changes.modifications) && _.isEmpty(changes.insertions))) {
        _.forEach(collection, (tx) => {
          yield call(processor, tx, 'initial');
        });
        return;
      }

      _.forEach(changes.insertions, (index) => {
        yield call(processor, collection[index], 'added');
      });

      _.forEach(changes.insertions, (index) => {
        yield call(processor, collection[index], 'modified');
      });
    },
  );
}
