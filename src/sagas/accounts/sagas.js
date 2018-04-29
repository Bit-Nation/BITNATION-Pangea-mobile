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
import type {
  CheckPasswordAction, CheckPinCodeAction, LoginAction, SavePasswordAction,
  SavePinCodeAction,
} from '../../actions/accounts';
import { convertFromDatabase } from '../../utils/mapping/account';
import TaskBuilder from '../../utils/asyncTask';
import AccountsService from '../../services/accounts';
import { InvalidPasswordError } from '../../global/errors/accounts';
import type { AccountType as DBAccount } from '../../services/database/schemata';
import type { UpdateAccountAction } from '../../actions/profile';

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
 * @desc Gets an account with specified id from realm.
 * @param {string} id Id of account to be got.
 * @return {DBAccount|null} Realm object of account with specified id or null if there is no account with specified id.
 */
export function* getAccount(id: string): Generator<*, *, *> {
  const db = yield call(dbFactory);
  const results = db.objects('Account').filtered(`id == '${id}'`);
  return yield results[0];
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
  return yield call(getAccount, id);
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
  const account = yield call(getAccount, action.accountId);
  const isValid = yield call(AccountsService.checkPasscode, account.accountStore, action.password);
  if (isValid !== true) {
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
  yield call(AccountsService.logout);
  yield put(currentAccountIdChanged(null));
}

/**
 * @desc Saves updated account to database.
 * @param {UpdateAccountAction} action An action saga was called with.
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

/**
 * @desc Checks if entered pin code is correct for an account which id is set in the action.
 * @param {CheckPinCodeAction} action An action.
 * @return {void}
 */
export function* checkPinCode(action: CheckPinCodeAction): Generator<*, *, *> {
  // @todo Check if pin code is correct.
  action.callback(true);
  yield;
}

/**
 * @desc Checks if entered password is correct for an account which id is set in the action.
 * @param {CheckPasswordAction} action An action.
 * @return {void}
 */
export function* checkPassword(action: CheckPasswordAction): Generator<*, *, *> {
  // @todo Check if password is correct.
  action.callback(true);
  yield;
}

/**
 * @desc Saves new pin code for an account which id is set in the action.
 * @param {SavePinCodeAction} action An action.
 * @return {void}
 */
export function* savePinCode(action: SavePinCodeAction): Generator<*, *, *> {
  // @todo Save pin code.
  action.callback(true);
  yield;
}

/**
 * @desc Save new password for an account which id is set in the action.
 * @param {SavePasswordAction} action An action.
 * @return {void}
 */
export function* savePassword(action: SavePasswordAction): Generator<*, *, *> {
  // @todo Save password.
  action.callback(true);
  yield;
}
