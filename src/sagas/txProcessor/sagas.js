/* eslint-disable no-restricted-syntax,no-param-reassign */
// @flow

import { call, put, take } from 'redux-saga/effects';
import type { Realm } from 'realm';
import _ from 'lodash';

import { currentAccountBasedUpdate } from '../accounts/sagas';
import type { TransactionJobType } from '../../services/database/schemata';
import ServiceContainer from '../../services/container';
import { SERVICES_CREATED } from '../../actions/serviceContainer';
import { TX_JOB_STATUS, TX_JOB_TYPE } from '../../global/Constants';
import defaultDB from '../../services/database';
import {
  NATION_CREATE_FAILED,
  NATION_CREATE_SUCCEED,
} from '../../global/transKeys';
import { addNewMessage } from '../../actions/activity';

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

// Processors

export function* createNationProcessor(txSuccess: boolean, tx: TransactionJobType): Generator<*, *, *> {
  console.log('HERE');
  console.log(tx);
  if (tx.nation[0] == null) {
    throw new Error('Unexpected! There is no nation present on the job object');
  }

  const db = yield defaultDB;
  db.write(() => {
    tx.status = txSuccess ? TX_JOB_STATUS.SUCCESS : TX_JOB_STATUS.FAILED;
  });

  return addNewMessage(
    txSuccess ? NATION_CREATE_SUCCEED : NATION_CREATE_FAILED,
    { nationName: tx.nation[0].nationName },
    true,
  );
}

// Main processor

export function* processTransaction(tx: TransactionJobType, changeType: 'initial' | 'added' | 'modified'): Generator<*, *, *> {
  if (tx.status !== TX_JOB_STATUS.PENDING) {
    // We need to process only pending transactions
    return;
  }

  const processor = (() => {
    switch (tx.type) {
      case TX_JOB_TYPE.NATION_CREATE: return createNationProcessor;
      default: return null;
    }
  })();

  if (processor === null) {
    return;
    throw new Error(`Couldn't find a processor for type: ${tx.type}`);
  }

  const db = yield defaultDB;
  yield call([ServiceContainer.instance.ethereumService, 'trackTransaction'], tx.txHash);
  const receipt = yield call([ServiceContainer.instance.ethereumService, 'getTransactionReceipt'], tx.txHash);

  console.log('HEY HEY HEY');
  console.log(receipt);

  const messageAction = yield call(processor, receipt.status === 1, tx);
  db.write(() => {
    tx.nation[0].resetStateMutateAllowed = true;
    tx.nation[0].stateMutateAllowed = true;
  });

  if (messageAction != null) {
    yield put(messageAction);
  }
}

export function* onCurrentAccountChange(
  collection: Realm.Collection<TransactionJobType>,
  changes: Realm.CollectionChangeSet<TransactionJobType>,
): Generator<*, *, *> {
  const { ethereumService } = ServiceContainer.instance;
  if (ethereumService == null) {
    // Wait until services are ready to use.
    yield take(SERVICES_CREATED);
  }

  if (changes == null || (_.isEmpty(changes.deletions) && _.isEmpty(changes.modifications) && _.isEmpty(changes.insertions))) {
    for (let index = 0; index < collection.length; index += 1) {
      yield call(processTransaction, collection[index], 'initial');
    }
    return;
  }

  for (const index of changes.insertions) {
    yield call(processTransaction, collection[index], 'added');
  }

  for (const index of changes.modifications) {
    yield call(processTransaction, collection[index], 'modified');
  }
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
