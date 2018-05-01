/* eslint-disable no-use-before-define */
// @flow

import type { Realm } from 'realm';
import { call, put, take, select, race } from 'redux-saga/effects';

import { factory as dbFactory } from '../../services/database';
import { createDatabaseUpdateChannel } from '../database';
import {
  accountListUpdated,
  changeCreatingAccountField,
  checkPassword,
  CURRENT_ACCOUNT_ID_CHANGED,
  currentAccountIdChanged,
  loginTaskUpdated, PERFORM_DEFERRED_LOGIN,
  savePassword,
} from '../../actions/accounts';
import type {
  CheckPasswordAction, CheckPinCodeAction, LoginAction, SaveCreatingAccountAction, SavePasswordAction,
  SavePinCodeAction,
} from '../../actions/accounts';
import { convertFromDatabase, convertToDatabase } from '../../utils/mapping/account';
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
 * @desc Takes login action and calls perform login with corresponding parameters.
 * @param {LoginAction} action An action
 * @return {void}
 */
export function* loginActionHandler(action: LoginAction): Generator<*, *, *> {
  yield call(login, { accountId: action.accountId }, action.password, action.deferred);
}

/**
 * @desc Performs a login of user.
 * @param {*} userInfo Either object containing account id or account store to log in.
 * @param {string} password Password to use on login.
 * @param {boolean} deferred Flag whether login should be deferred until performDeferredLogin action is called.
 * @returns {void}
 */
export function* login(userInfo: ({ accountId: string, accountStore?: string }), password: string, deferred: boolean = false): Generator<*, *, *> {
  yield put(loginTaskUpdated(TaskBuilder.pending()));
  const { accountId } = userInfo;
  let accountStore: string;
  if (userInfo.accountStore == null) {
    const account = yield getAccount(accountId);
    ({ accountStore } = account);
  } else {
    ({ accountStore } = userInfo);
  }

  const isValid = yield call(AccountsService.checkPasscode, accountStore, password);
  if (isValid !== true) {
    yield put(loginTaskUpdated(TaskBuilder.failure(new InvalidPasswordError())));
    return;
  }
  if (deferred === true) {
    yield take(PERFORM_DEFERRED_LOGIN);
  }

  yield put(currentAccountIdChanged(accountId));
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
export function* checkPinCodeSaga(action: CheckPinCodeAction): Generator<*, *, *> {
  yield call(checkPasswordSaga, checkPassword(action.pinCode, action.accountId, action.callback));
}

/**
 * @desc Checks if entered password is correct for an account which id is set in the action.
 * @param {CheckPasswordAction} action An action.
 * @return {void}
 */
export function* checkPasswordSaga(action: CheckPasswordAction): Generator<*, *, *> {
  try {
    const success = yield call(AccountsService.checkPasscode, action.accountId, action.password);
    action.callback(success);
  } catch (e) {
    action.callback(false);
  }
}

/**
 * @desc Saves new pin code for an account which id is set in the action.
 * @param {SavePinCodeAction} action An action.
 * @return {void}
 */
export function* savePinCodeSaga(action: SavePinCodeAction): Generator<*, *, *> {
  yield call(savePasswordSaga, savePassword(action.pinCode, action.accountId, action.callback));
}

/**
 * @desc Save new password for an account which id is set in the action.
 * @param {SavePasswordAction} action An action.
 * @return {void}
 */
export function* savePasswordSaga(action: SavePasswordAction): Generator<*, *, *> {
  const { accountId } = action;
  try {
    if (accountId === null) {
      // It's a new account, new keys need to be created.
      const accountStore = yield call(AccountsService.createAccountStore, action.password);
      yield put(changeCreatingAccountField('accountStore', accountStore));
      const { accounts } = yield select();
      const { creatingAccount } = accounts;
      action.callback(true);

      // We start deferred login, because it's the only place when we have password to do it.
      yield call(login, { accountId: creatingAccount.id, accountStore }, action.password, true);
    } else {
      // It's an existing account, old keys need to be encrypted with new password and saved.
      const newAccountStore = yield call(AccountsService.exportAccountStore, action.password);
      const db = yield call(dbFactory);
      const account: DBAccount = yield call(getAccount, accountId);
      db.write(() => {
        account.accountStore = newAccountStore;
      });
      action.callback(true);
    }
  } catch (e) {
    action.callback(false);
  }
}

/**
 * @desc Saves creating account into database.
 * @param {SaveCreatingAccountAction} action An action.
 * @return {void}
 */
export function* saveCreatingAccount(action: SaveCreatingAccountAction): Generator<*, *, *> {
  const { accounts } = yield select();
  const { creatingAccount } = accounts;
  const convertedAccount = convertToDatabase(creatingAccount);
  if (convertedAccount === null) {
    action.callback(false);
  } else {
    const db = yield dbFactory();
    db.write(() => {
      db.create('Account', convertedAccount);
    });
    action.callback(true);
  }
}
