/* eslint-disable no-use-before-define */
// @flow

import type { Realm } from 'realm';
import { call, put, take, select, race } from 'redux-saga/effects';

import { factory as dbFactory } from '../../services/database';
import { createDatabaseUpdateChannel } from '../database';
import {
  accountListUpdated, CURRENT_ACCOUNT_ID_CHANGED, currentAccountIdChanged,
  loginTaskUpdated,
} from '../../actions/accounts';
import type { LoginAction } from '../../actions/accounts';
import { convertFromDatabase } from '../../utils/mapping/account';
import TaskBuilder from '../../utils/asyncTask';
import AccountsService from '../../services/accounts';
import { InvalidPasswordError } from '../../global/errors/accounts';
import type { AccountType as DBAccount } from '../../services/database/schemata';
import type { State as RootState } from '../../reducers';
import { UpdateAccountAction } from '../../actions/profile';

/**
 * @desc That function should be used for listening on information that depends on current account.
 * That way it will automatically be updated once account is switched.
 * @param {function} resultsBuilder A function that takes realm and account id and returns a realm results collection to be listened on.
 * @param {function} onChange A function that is called on every change and takes updated collection and changes.
 * @return {void}
 */
export function* currentAccountBasedUpdate<T>(
  resultsBuilder: (realm: Realm, currentAccountId: string | null) => Realm.Results<T>,
  onChange: (Realm.Collection<T>, Realm.CollectionChangeSet<T>) => void,
): Generator<*, *, *> {
  /**
   * @desc Function that is actually start listening on current account.
   * @return {void}
   */
  function* startListening(): Generator<*, *, *> {
    const currentAccountId = yield call(getCurrentAccountId);
    const realm = yield call(dbFactory);
    const channel = createDatabaseUpdateChannel(resultsBuilder(realm, currentAccountId));
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
export function* getCurrentAccountId(): Generator<*, *, *> {
  const { accounts } = yield select();
  return accounts.currentAccountId;
}

/**
 * @desc Gets current account realm object.
 * @return {DBAccount} Current account realm object.
 */
export function* getCurrentAccount(): Generator<*, *, *> {
  const id = yield call(getCurrentAccountId);
  if (id === null) {
    return yield null;
  }
  const db = yield call(dbFactory);
  const results = db.objects('Account').filtered(`id == '${id}'`);
  return yield results[0];
}

/**
 * @desc Start listen for database updates and update the state accordingly.
 * @returns {void}
 */
export function* listenForDatabaseUpdates(): Generator<*, *, *> {
  const db = yield call(dbFactory);
  const results = db.objects('Account');
  const channel = createDatabaseUpdateChannel(results);
  while (true) {
    const { collection } = yield take(channel);
    yield put(accountListUpdated(collection.map(convertFromDatabase)));
  }
}

/**
 * @desc Performs a login of user.
 * @param {LoginAction} action Action that contains login parameters.
 * @returns {void}
 */
export function* login(action: LoginAction): Generator<*, *, *> {
  yield put(loginTaskUpdated(TaskBuilder.pending()));
  const isValid = yield AccountsService.checkPassword(action.accountId, action.password);
  if (!isValid) {
    yield put(loginTaskUpdated(TaskBuilder.failure(new InvalidPasswordError())));
    return;
  }
  yield put(currentAccountIdChanged(action.accountId));
  yield put(loginTaskUpdated(TaskBuilder.success()));
}

/**
 * @desc Performs a logout.
 * @return {void}
 */
export function* logout(): Generator<*, *, *> {
  yield put(currentAccountIdChanged(null));
}

/**
 * @desc Saves updated account to database.
 * @return {void}
 */
export function* doneAccountEditing(action: UpdateAccountAction): Generator<*, *, *> {
  const account: DBAccount = yield call(getCurrentAccount);
  if (account === null) {
    return;
  }
  const { account: editingAccount } = action;
  if (editingAccount === null) {
    return;
  }
  const db = yield dbFactory();
  db.write(() => {
    account.location = editingAccount.location ? editingAccount.location.trim() : '';
    account.name = editingAccount.name.trim();
  });
}
