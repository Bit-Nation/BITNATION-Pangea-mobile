/* eslint-disable no-use-before-define */
import type { Realm } from 'realm';
import { call, put, take, select, race } from 'redux-saga/effects';

import { factory as dbFactory } from '../../services/database';
import { createDatabaseUpdateChannel } from '../database';
import {
  accountListUpdated, CURRENT_ACCOUNT_ID_CHANGED, currentAccountIdChanged,
  loginTaskUpdated, logoutTaskUpdated,
} from '../../actions/accounts';
import type { LoginAction } from '../../actions/accounts';
import { convertFromDatabase } from '../../utils/mapping/account';
import TaskBuilder from '../../utils/asyncTask';
import AccountsService from '../../services/accounts';
import { InvalidPasswordError } from '../../global/errors/accounts';

/**
 * @desc That function should be used for listening on information that depends on current account.
 * That way it will automatically be updated once account is switched.
 * @param {function} resultsBuilder A function that takes an account and returns a realm results collection to be listened on.
 * @param {function} onChange A function that is called on every change and takes updated collection and changes.
 * @return {void}
 */
export function* currentAccountBasedUpdate<T>(
  resultsBuilder: (currentAccountId: string | null) => Realm.Results<T>,
  onChange: (Realm.Collection<T>, Realm.CollectionChangeSet<T>) => void,
) {
  /**
   * @desc Function that is actually start listening on current account.
   * @return {void}
   */
  function* startListening() {
    const currentAccountId = yield call(getCurrentAccountId);
    const channel = createDatabaseUpdateChannel(resultsBuilder(currentAccountId));
    while (true) {
      const { collection, changes } = yield take(channel);
      onChange(collection, changes);
    }
  }

  while (true) {
    yield race({
      task: call(startListening),
      cancel: take(CURRENT_ACCOUNT_ID_CHANGED),
    });
  }
}

/**
 * @desc Returns current account id or null.
 * @return {string|null} Current account id or null.
 */
export function* getCurrentAccountId() {
  const { accounts } = yield select();
  return accounts.currentAccountId;
}

/**
 * @desc Start listen for database updates and update the state accordingly.
 * @returns {void}
 */
export function* listenForDatabaseUpdates() {
  const db = yield dbFactory();
  const results = db.objects('Account');
  const channel = createDatabaseUpdateChannel(results);
  while (true) {
    const { collection } = yield take(channel);
    yield put(accountListUpdated(collection.map(convertFromDatabase)));
  }
}

/**
 * @desc Performs a login of user.
 * @param {LoginAction} action LoginAction that contains login parameters.
 * @returns {void}
 */
export function* login(action: LoginAction) {
  yield put(loginTaskUpdated(TaskBuilder.pending()));
  const isValid = yield AccountsService.checkPassword(action.accountId, action.password);
  if (!isValid) {
    yield put(loginTaskUpdated(TaskBuilder.failure(new InvalidPasswordError())));
    return;
  }
  yield put(currentAccountIdChanged(action.accountId));
  yield put(loginTaskUpdated(TaskBuilder.success()));
}
