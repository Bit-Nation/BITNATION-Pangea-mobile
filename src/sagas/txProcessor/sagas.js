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
  NATION_CREATE_SUCCEED, NATION_JOIN_FAILED, NATION_JOIN_SUCCEED, NATION_LEAVE_FAILED, NATION_LEAVE_SUCCEED,
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

/**
 * @desc Processor for CREATE_NATION transaction type.
 * @param {boolean} txSuccess True iff transaction is successful.
 * @param {TransactionJobType} tx Transaction object.
 * @return {AddNewMessageAction} Returns an action to create a new log message.
 */
export function* createNationProcessor(txSuccess: boolean, tx: TransactionJobType): Generator<*, *, *> {
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

/**
 * @desc Processor for JOIN_NATION transaction type.
 * @param {boolean} txSuccess True iff transaction is successful.
 * @param {TransactionJobType} tx Transaction object.
 * @return {AddNewMessageAction} Returns an action to create a new log message.
 */
export function* joinNationProcessor(txSuccess: boolean, tx: TransactionJobType): Generator<*, *, *> {
  if (tx.nation[0] == null) {
    throw new Error('Unexpected! There is no nation present on the job object');
  }

  const db = yield defaultDB;
  db.write(() => {
    tx.status = txSuccess ? TX_JOB_STATUS.SUCCESS : TX_JOB_STATUS.FAILED;
    if (txSuccess) {
      tx.nation[0].joined = true;
    }
  });

  return addNewMessage(
    txSuccess ? NATION_JOIN_SUCCEED : NATION_JOIN_FAILED,
    { nationName: tx.nation[0].nationName },
    true,
  );
}

/**
 * @desc Processor for LEAVE_NATION transaction type.
 * @param {boolean} txSuccess True iff transaction is successful.
 * @param {TransactionJobType} tx Transaction object.
 * @return {AddNewMessageAction} Returns an action to create a new log message.
 */
export function* leaveNationProcessor(txSuccess: boolean, tx: TransactionJobType): Generator<*, *, *> {
  if (tx.nation[0] == null) {
    throw new Error('Unexpected! There is no nation present on the job object');
  }

  const db = yield defaultDB;
  db.write(() => {
    tx.status = txSuccess ? TX_JOB_STATUS.SUCCESS : TX_JOB_STATUS.FAILED;
    if (txSuccess) {
      tx.nation[0].joined = false;
    }
  });

  return addNewMessage(
    txSuccess ? NATION_LEAVE_SUCCEED : NATION_LEAVE_FAILED,
    { nationName: tx.nation[0].nationName },
    true,
  );
}

// Main processor

/**
 * @desc General processor that is common for all transactions.
 * @param {TransactionJobType} tx Transaction object.
 * @return {void}
 */
export function* processTransaction(tx: TransactionJobType): Generator<*, *, *> {
  if (tx.status !== TX_JOB_STATUS.PENDING) {
    // We need to process only pending transactions
    return;
  }

  const processor = (() => {
    switch (tx.type) {
      case TX_JOB_TYPE.NATION_CREATE: return createNationProcessor;
      case TX_JOB_TYPE.NATION_JOIN: return joinNationProcessor;
      case TX_JOB_TYPE.NATION_LEAVE: return leaveNationProcessor;
      default: return null;
    }
  })();

  if (processor === null) {
    throw new Error(`Couldn't find a processor for type: ${tx.type}`);
  }

  yield call([ServiceContainer.instance.ethereumService, 'trackTransaction'], tx.txHash);
  const receipt = yield call([ServiceContainer.instance.ethereumService, 'getTransactionReceipt'], tx.txHash);

  const messageAction = yield call(processor, receipt.status === 1, tx);

  if (messageAction != null) {
    yield put(messageAction);
  }
}

/**
 * @desc Generator to be called on database change. Used to call processor on transactions from database.
 * @param {*} collection Updated transactions collection
 * @param {*} changes Transactions collection changes.
 * @return {void}
 */
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
