/* eslint-disable no-use-before-define */
// @flow

import type { Realm } from 'realm';
import { call, put, take, select, race } from 'redux-saga/effects';
import defaultDB from '../../services/database';
import { createDatabaseUpdateChannel } from '../database';
import {
  accountListUpdated,
  changeCreatingAccountField,
  checkPassword,
  CURRENT_ACCOUNT_ID_CHANGED,
  currentAccountIdChanged,
  loginTaskUpdated,
  PERFORM_DEFERRED_LOGIN,
  savePassword,
} from '../../actions/accounts';
import type {
  CheckPasswordAction,
  CheckPinCodeAction,
  LoginAction, MnemonicConfirmedAction,
  ValidateMnemonicWithAccountAction,
  SaveCreatingAccountAction,
  SavePasswordAction,
  SavePinCodeAction,
} from '../../actions/accounts';
import { fetchAllChats } from '../../actions/chat';
import {
  convertFromDatabase, convertToDatabase, retrieveProfileFromAccount,
  retrieveProfileFromPartialAccount,
} from '../../utils/mapping/account';
import TaskBuilder from '../../utils/asyncTask';
import AccountsService from '../../services/accounts';
import { InvalidPasswordError, LoginFailedError } from '../../global/errors/accounts';
import type { AccountType as DBAccount } from '../../services/database/schemata';
import type { NetworkType, Profile } from '../../types/Account';
import type { SaveEditingAccountAction } from '../../actions/profile';
import { cancelAccountEditing, setPublicKey } from '../../actions/profile';
import { resetSettings } from '../../actions/settings';
import ChatService from '../../services/chat';
import { version } from '../../../package.json';
import type { State as AccountsState } from '../../reducers/accounts';

export const getAccounts = (state: AccountsState) => state.accounts;

/**
 * @desc That function should be used for listening on information that depends on current account.
 * That way it will automatically be updated once account is switched.
 * @param {function} resultsBuilder A function that takes realm and account id and returns a realm results collection to be listened on.
 * @param {function|Generator} onChange A function that is called on every change and takes updated collection and changes.
 * @return {void}
 */
export function* currentAccountBasedUpdate<T>(
  resultsBuilder: (realm: Realm, currentAccountId: string | null) => Realm.Results<T> | null,
  onChange: any,
): Generator<*, *, *> {
  while (true) {
    yield race({
      task: call(startAccountUpdateListening, resultsBuilder, onChange),
      cancel: take(CURRENT_ACCOUNT_ID_CHANGED),
    });
  }
}

/**
 * @desc Function that is actually start listening on current account updates.
 * @param {function} resultsBuilder A function that takes realm and account id and returns a realm results collection to be listened on.
 * @param {function|Generator} onChange A function that is called on every change and takes updated collection and changes.
 * @return {void}
 */
export function* startAccountUpdateListening<T>(
  resultsBuilder: (realm: Realm, currentAccountId: string | null) => Realm.Results<T> | null,
  onChange: any,
): Generator<*, *, *> {
  const currentAccountId = yield call(getCurrentAccountId);
  const db = yield defaultDB;
  const results = yield call(resultsBuilder, db, currentAccountId);
  if (results === null) {
    // If there is nothing to listen on, we should not exit listener, since that will cause race to stop.
    // So, we are hanging it and it will stop once current account id is changed.
    yield take('HANG_FOREVER');
    return;
  }
  const channel = yield call(createDatabaseUpdateChannel, results);
  while (true) {
    const { collection, changes } = yield take(channel);
    yield call(onChange, collection, changes);
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
  const db = yield defaultDB;
  const results = db.objects('Account');
  return yield results.length > 0;
}

/**
 * @desc Gets an account with specified id from realm.
 * @param {string} id Id of account to be got.
 * @return {DBAccount|null} Realm object of account with specified id or null if there is no account with specified id.
 */
export function* getAccount(id: string): Generator<*, *, *> {
  const db = yield defaultDB;
  const results = db.objects('Account').filtered(`id == '${id}'`);
  return yield results[0] || null;
}

/**
 * @desc Gets current account realm object.
 * @return {DBAccount|null} Current account realm object or null.
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
export function* listenForDatabaseUpdates(): Generator<*, *, any> {
  const db = yield defaultDB;
  const results = yield call([db, 'objects'], 'Account');
  const channel = yield call(createDatabaseUpdateChannel, results);
  while (true) {
    const { collection } = yield take(channel);
    yield put(accountListUpdated(collection.map(convertFromDatabase)));
  }
}

/**
 * @desc Updates signed profile in Panthalassa.
 * @returns {void}
 */
export function* updateSignedProfile(): Generator<*, *, *> {
  const dbAccount: DBAccount = yield call(getCurrentAccount);
  if (dbAccount != null) {
    const account = convertFromDatabase(dbAccount);
    yield call(AccountsService.signProfile, retrieveProfileFromAccount(account));
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
  if (deferred === true) {
    yield take(PERFORM_DEFERRED_LOGIN);
  }

  yield put(loginTaskUpdated(TaskBuilder.pending()));
  const { accountId } = userInfo;
  let accountStore: string;
  let networkType: NetworkType = 'main';
  let profile: Profile;
  if (userInfo.accountStore == null) {
    const account: DBAccount = yield call(getAccount, accountId);
    ({ accountStore, networkType } = account);
    profile = retrieveProfileFromAccount(convertFromDatabase(account));
  } else {
    ({ accountStore } = userInfo);
    const { creatingAccount } = yield select(getAccounts);
    const result = retrieveProfileFromPartialAccount(creatingAccount);
    if (result == null) {
      yield put(loginTaskUpdated(TaskBuilder.failure(new LoginFailedError())));
      return;
    }
    profile = result;
    ({ networkType } = creatingAccount);
  }

  try {
    const isValid = yield call(AccountsService.login, accountStore, profile, password, networkType);
    if (isValid !== true) {
      yield put(loginTaskUpdated(TaskBuilder.failure(new InvalidPasswordError())));
      return;
    }
  } catch (error) {
    console.log('--> ERROR Login: ', error);
    if (error.transKey !== undefined) {
      yield put(loginTaskUpdated(TaskBuilder.failure(error)));
    } else {
      yield put(loginTaskUpdated(TaskBuilder.failure(new LoginFailedError())));
    }
    return;
  }

  const publicKey = yield call(ChatService.getPublicKey);
  yield put(setPublicKey(publicKey));

  yield put(currentAccountIdChanged(accountId));

  yield put(loginTaskUpdated(TaskBuilder.success()));

  yield put(fetchAllChats());
}

/**
 * @desc Valid mnemonic with account choice to login
 * @param {ValidateMnemonicWithAccountAction} action An action
 * @return {void}
 */
export function* validateMnemonicWithAccountActionHandler(action: ValidateMnemonicWithAccountAction): Generator<*, *, *> {
  yield call(validateMnemonicWithAccount, { accountId: action.accountId }, action.callback);
}

/**
 * @desc Valid mnemonic with account choice to login
 * @param {*} userInfo Either object containing account id or account store to log in.
 * @param {function} callback Function that is called when that information is valid mnemonic.
 * @return {void}
 */
export function* validateMnemonicWithAccount(userInfo: ({ accountId: string }), callback: (success: boolean) => void): Generator<*, *, *> {
  const { accountId } = userInfo;
  const account: DBAccount = yield call(getAccount, accountId);
  const { accountStore } = account;
  const profile = retrieveProfileFromAccount(convertFromDatabase(account));
  try {
    const { key: { enteredMnemonic } } = yield select();
    const isValid = yield call(AccountsService.validateMnemonicWithAccount, accountStore, profile, enteredMnemonic);
    yield call(callback, isValid);
  } catch (error) {
    console.log('--> ERROR Login: ', error);
    yield call(callback, false);
  }
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
 * @param {SaveEditingAccountAction} action An action saga was called with.
 * @return {void}
 */
export function* saveEditingAccount(action: SaveEditingAccountAction): Generator<*, *, *> {
  const account: DBAccount = yield call(getCurrentAccount);
  if (account === null) {
    return;
  }
  const { account: editingAccount } = action;
  const db = yield defaultDB;
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
    const account: DBAccount = yield call(getAccount, action.accountId);
    const { accountStore, networkType } = account;
    const profile = retrieveProfileFromAccount(convertFromDatabase(account));
    const success = yield call(AccountsService.checkPasscode, accountStore, profile, action.password, networkType);
    yield call(action.callback, success);
  } catch (e) {
    yield call(action.callback, false);
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
export function* savePasswordSaga(action: SavePasswordAction): Generator<*, *, any> {
  const { accountId, password } = action;
  const { accounts } = yield select();
  const { currentCreation } = accounts;
  try {
    if (currentCreation === null) {
      // It's an existing account, old keys need to be encrypted with new password and saved.
      const newAccountStore = yield call(AccountsService.exportAccountStore, action.password);
      const db = yield defaultDB;
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
  let convertedAccount;

  if (creatingAccount === null) {
    yield call(action.callback, false);
    return;
  }
  if (version !== null && version !== undefined) {
    convertedAccount = convertToDatabase(creatingAccount, version);
  } else {
    convertedAccount = convertToDatabase(creatingAccount, '0.0.0');
  }
  if (convertedAccount === null) {
    yield call(action.callback, false);
    return;
  }

  const db = yield defaultDB;
  db.write(() => {
    db.create('Account', convertedAccount);
  });
  yield call(action.callback, true);

  yield put(cancelAccountEditing());
}

/**
 * @desc Saves to database that mnemonic was confirmed to written down by user.
 * @param {MnemonicConfirmedAction} action An action.
 * @return {void}
 */
export function* saveMnemonicConfirmed(action: MnemonicConfirmedAction): Generator<*, *, *> {
  const account = yield call(getCurrentAccount);

  if (account == null) {
    yield call(action.callback, false);
    return;
  }

  const db = yield defaultDB;
  db.write(() => {
    account.confirmedMnemonic = true;
  });
  yield call(action.callback, true);
}
