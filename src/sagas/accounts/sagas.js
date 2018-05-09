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
  CheckPasswordAction,
  CheckPinCodeAction,
  LoginAction,
  SaveCreatingAccountAction,
  SavePasswordAction,
  SavePinCodeAction,
} from '../../actions/accounts';
import { convertFromDatabase, convertToDatabase } from '../../utils/mapping/account';
import TaskBuilder from '../../utils/asyncTask';
import AccountsService from '../../services/accounts';
import { InvalidPasswordError, LoginFailedError } from '../../global/errors/accounts';
import type { AccountType as DBAccount } from '../../services/database/schemata';
import type { UpdateAccountAction } from '../../actions/profile';
import { cancelAccountEditing } from '../../actions/profile';
import { resetSettings } from '../../actions/settings';

/**
 * @desc That function should be used for listening on information that depends on current account.
 * That way it will automatically be updated once account is switched.
 * @param {function} resultsBuilder A function that takes realm and account id and returns a realm results collection to be listened on.
 * @param {function} onChange A function that is called on every change and takes updated collection and changes.
 * @return {void}
 */
export function* currentAccountBasedUpdate<T>(
  resultsBuilder: (realm: Realm, currentAccountId: string | null) => Realm.Results<T> | null,
  onChange: Generator<*, *, *>,
): Generator<*, *, *> {
  /**
   * @desc Function that is actually start listening on current account.
   * @return {void}
   */
  function* startListening(): Generator<*, *, *> {
    const currentAccountId = yield call(getCurrentAccountId);
    const realm = yield call(dbFactory);
    const results = resultsBuilder(realm, currentAccountId);
    if (results === null) {
      // If there is nothing to listen on, we should not exit listener, since that will cause race to stop.
      // So, we are hanging it and it will stop once current account id is changed.
      yield take('HANG_FOREVER');
    }
    const channel = createDatabaseUpdateChannel(results);
    while (true) {
      const { collection, changes } = yield take(channel);
      yield call(onChange, collection, changes);
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
 * @desc Checks if there is at least one account in database.
 * @return {boolean} True if accounts are present in database.
 */
export function* accountsPresent(): Generator<*, *, *> {
  const db = yield call(dbFactory);
  const results = db.objects('Account');
  return yield results.length > 0;
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
 * @desc Performs preparation for account creation, e.g. clean settings.
 * @return {void}
 */
export function* startAccountCreation(): Generator<*, *, *> {
  yield put(resetSettings());
}

/**
 * @desc Performs preparation for account restoration, e.g. clean settings.
 * @return {void}
 */
export function* startRestoreAccountUsingMnemonic(): Generator<*, *, *> {
  yield put(resetSettings());
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

  try {
    const isValid = yield call(AccountsService.login, accountStore, password);
    if (isValid !== true) {
      yield put(loginTaskUpdated(TaskBuilder.failure(new InvalidPasswordError())));
      return;
    }
  } catch (error) {
    yield put(loginTaskUpdated(TaskBuilder.failure(new LoginFailedError())));
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
    account.profileImage = editingAccount.avatar || '';
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
    const account = yield getAccount(action.accountId);
    const { accountStore } = account;
    const success = yield call(AccountsService.checkPasscode, accountStore, action.password);
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
  const { accountId, password } = action;
  const { accounts } = yield select();
  const { currentCreation } = accounts;
  try {
    if (currentCreation === null) {
      // It's an existing account, old keys need to be encrypted with new password and saved.
      const newAccountStore = yield call(AccountsService.exportAccountStore, action.password);
      const db = yield call(dbFactory);
      const account: DBAccount = yield call(getAccount, accountId);
      db.write(() => {
        account.accountStore = newAccountStore;
      });
      yield call(action.callback, true);
      return;
    }

    let accountStore: string;
    if (currentCreation.type === 'create') {
      // It's a new account, new keys need to be created.
      accountStore = yield call(AccountsService.createAccountStore, password);
    } else if (currentCreation.type === 'restore') {
      // It's a new account restored from mnemonic, keys needs to be retrieved from it.
      accountStore = yield call(AccountsService.restoreAccountStore, currentCreation.mnemonic, password);
    } else {
      yield call(action.callback, false);
      return;
    }

    yield put(changeCreatingAccountField('accountStore', accountStore));
    yield call(action.callback, true);

    // We start deferred login, because it's the only place when we have password to do it.
    yield call(login, { accountId, accountStore }, password, true);
  } catch (e) {
    yield call(action.callback, false);
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
  yield put(cancelAccountEditing());
}
