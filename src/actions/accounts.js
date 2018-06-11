// @flow

import { type Account } from '../types/Account';
import type { AsyncTask } from '../utils/asyncTask';
import type { Mnemonic } from '../types/Mnemonic';

export type AccountsListUpdatedAction = { +type: 'ACCOUNTS_LIST_UPDATED', accounts: Array<Account> };
export type CurrentAccountIdChangedAction = { +type: 'CURRENT_ACCOUNT_ID_CHANGED', currentAccountId: string | null };
export type LoginAction = { +type: 'LOGIN', accountId: string, password: string, deferred: boolean };
export type PerformDeferredLoginAction = { +type: 'PERFORM_DEFERRED_LOGIN' };
export type LoginTaskUpdatedAction = { +type: 'LOGIN_TASK_UPDATED', loginTask: AsyncTask<void> };
export type LogoutAction = { +type: 'LOGOUT' };
export type StartAccountCreationAction = { +type: 'START_ACCOUNT_CREATION' };
export type CheckPinCodeAction = { +type: 'CHECK_PIN_CODE', +pinCode: string, +accountId: string, +callback: (success: boolean) => void };
export type CheckPasswordAction = { +type: 'CHECK_PASSWORD', +password: string, +accountId: string, +callback: (success: boolean) => void };
export type SavePinCodeAction = { +type: 'SAVE_PIN_CODE', +pinCode: string, +accountId: string, +callback: (success: boolean) => void };
export type SavePasswordAction = { +type: 'SAVE_PASSWORD', +password: string, +accountId: string, +callback: (success: boolean) => void };
export type ChangeCreatingAccountFieldAction = { +type: 'CHANGE_CREATING_ACCOUNT_FIELD', +field: string, +value: any };
export type SaveCreatingAccountAction = { +type: 'SAVE_CREATING_ACCOUNT', +callback: (success: boolean) => void };
export type StartRestoreAccountUsingMnemonicAction = { +type: 'START_RESTORE_ACCOUNT_USING_MNEMONIC', +mnemonic: Mnemonic };
export type MnemonicConfirmedAction = { +type: 'MNEMONIC_CONFIRMED', +callback: (success: boolean) => void };

export type Action =
  | AccountsListUpdatedAction
  | CurrentAccountIdChangedAction
  | LoginAction
  | PerformDeferredLoginAction
  | LoginTaskUpdatedAction
  | LogoutAction
  | StartAccountCreationAction
  | CheckPinCodeAction
  | CheckPasswordAction
  | SavePinCodeAction
  | SavePasswordAction
  | ChangeCreatingAccountFieldAction
  | SaveCreatingAccountAction
  | StartRestoreAccountUsingMnemonicAction
  | MnemonicConfirmedAction;

export const ACCOUNTS_LIST_UPDATED = 'ACCOUNTS_LIST_UPDATED';
export const CURRENT_ACCOUNT_ID_CHANGED = 'CURRENT_ACCOUNT_ID_CHANGED';
export const LOGIN = 'LOGIN';
export const LOGIN_TASK_UPDATED = 'LOGIN_TASK_UPDATED';
export const LOGOUT = 'LOGOUT';
export const START_ACCOUNT_CREATION = 'START_ACCOUNT_CREATION';
export const CHECK_PIN_CODE = 'CHECK_PIN_CODE';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';
export const SAVE_PIN_CODE = 'SAVE_PIN_CODE';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const CHANGE_CREATING_ACCOUNT_FIELD = 'CHANGE_CREATING_ACCOUNT_FIELD';
export const SAVE_CREATING_ACCOUNT = 'SAVE_CREATING_ACCOUNT';
export const PERFORM_DEFERRED_LOGIN = 'PERFORM_DEFERRED_LOGIN';
export const START_RESTORE_ACCOUNT_USING_MNEMONIC = 'START_RESTORE_ACCOUNT_USING_MNEMONIC';
export const MNEMONIC_CONFIRMED = 'MNEMONIC_CONFIRMED';

/**
 * @desc Action creator for an action that is called when accounts list updated.
 * @param {Account[]} accounts Updated version of accounts.
 * @returns {AccountsListUpdatedAction} An action.
 */
export function accountListUpdated(accounts: Array<Account>): AccountsListUpdatedAction {
  return {
    type: ACCOUNTS_LIST_UPDATED,
    accounts,
  };
}


/**
 * @desc Action creator for an action that is called when current account id is changed.
 * That happens on login and logout.
 * @param {string | null} currentAccountId New id to be set as current or null if user logged out completely.
 * @return {CurrentAccountIdChangedAction} An action.
 */
export function currentAccountIdChanged(currentAccountId: string | null): CurrentAccountIdChangedAction {
  return {
    type: CURRENT_ACCOUNT_ID_CHANGED,
    currentAccountId,
  };
}

/**
 * @desc Action creator for an action that is called to perform a login.
 * @param {string} accountId Id of account to login to.
 * @param {string} password Password to login.
 * @param {boolean} deferred Flag if login should wait for performDeferredLogin action to proceed.
 * @return {LoginAction} An action.
 */
export function login(accountId: string, password: string, deferred: boolean = false): LoginAction {
  return {
    type: LOGIN,
    accountId,
    password,
    deferred,
  };
}

/**
 * @desc Action creator for an action to perform login that was deferred. That is used to not store password while creating account.
 * @return {PerformDeferredLoginAction} An action.
 */
export function performDeferredLogin(): PerformDeferredLoginAction {
  return {
    type: PERFORM_DEFERRED_LOGIN,
  };
}

/**
 * @desc Action creator for an action that is called when login task status updated.
 * @param {AsyncTask<void>} loginTask Updated async task.
 * @return {LoginTaskUpdatedAction} An action.
 */
export function loginTaskUpdated(loginTask: AsyncTask<void>): LoginTaskUpdatedAction {
  return {
    type: LOGIN_TASK_UPDATED,
    loginTask,
  };
}

/**
 * @desc Action creator for an action that is called to perform a logout.
 * @return {LogoutAction} An action.
 */
export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}


/**
 * @desc Action creator for an action that is called to start creation of new account.
 * @return {StartAccountCreationAction} An action.
 */
export function startAccountCreation(): StartAccountCreationAction {
  return {
    type: START_ACCOUNT_CREATION,
  };
}

/**
 * @desc Action creator for an action that is called to check entered pin code.
 * @param {string} pinCode Pin code to check.
 * @param {string} accountId Id of account which pin code is going to be checked.
 * @param {function} callback Callback that is called with true if check is successful and false otherwise.
 * @return {CheckPinCodeAction} An action.
 */
export function checkPinCode(pinCode: string, accountId: string, callback: (boolean) => void): CheckPinCodeAction {
  return {
    type: CHECK_PIN_CODE,
    accountId,
    pinCode,
    callback,
  };
}

/**
 * @desc Action creator for an action that is called to check entered password.
 * @param {string} password Password to check.
 * @param {string} accountId Id of account which password is going to be checked.
 * @param {function} callback Callback that is called with true if check is successful and false otherwise.
 * @return {CheckPinCodeAction} An action.
 */
export function checkPassword(password: string, accountId: string, callback: (boolean) => void): CheckPasswordAction {
  return {
    type: CHECK_PASSWORD,
    accountId,
    password,
    callback,
  };
}

/**
 * @desc Action creator for an action that is called to save new pin code.
 * @param {string} pinCode Pin code to save.
 * @param {string} accountId Id of account which pin code is going to be saved.
 * @param {function} callback Callback that is called with true if save is successful and false otherwise.
 * @return {SavePinCodeAction} An action.
 */
export function savePinCode(pinCode: string, accountId: string, callback: (boolean) => void): SavePinCodeAction {
  return {
    type: SAVE_PIN_CODE,
    accountId,
    pinCode,
    callback,
  };
}

/**
 * @desc Action creator for an action that is called to save new password.
 * @param {string} password Password to save.
 * @param {string} accountId Id of account which password is going to be saved.
 * @param {function} callback Callback that is called with true if save is successful and false otherwise.
 * @return {SavePinCodeAction} An action.
 */
export function savePassword(password: string, accountId: string, callback: (boolean) => void): SavePasswordAction {
  return {
    type: SAVE_PASSWORD,
    accountId,
    password,
    callback,
  };
}

/**
 * @desc Action creator for an action that is called to change a field on creating account.
 * @param {string} field Name of the field to change.
 * @param {any} value New value of the field.
 * @return {ChangeCreatingAccountFieldAction} An action.
 */
export function changeCreatingAccountField(field: string, value: any): ChangeCreatingAccountFieldAction {
  return {
    type: CHANGE_CREATING_ACCOUNT_FIELD,
    field,
    value,
  };
}

/**
 * @desc Action creator for an action that is called to save currently created account.
 * @param {Function} callback Callback that receives boolean value - whether save is successful.
 * @return {SaveCreatingAccountAction} An action.
 */
export function saveCreatingAccount(callback: (boolean) => void): SaveCreatingAccountAction {
  return {
    type: SAVE_CREATING_ACCOUNT,
    callback,
  };
}

/**
 * @desc Action creator for an action that is called to restore account using mnemonic.
 * @param {Mnemonic} mnemonic Mnemonic to be used.
 * @return {StartRestoreAccountUsingMnemonicAction} An action.
 */
export function startRestoreAccountUsingMnemonic(mnemonic: Mnemonic): StartRestoreAccountUsingMnemonicAction {
  return {
    type: START_RESTORE_ACCOUNT_USING_MNEMONIC,
    mnemonic,
  };
}

/**
 * @desc Action creator for an action that is called when mnemonic is confirmed to record that to database.
 * @param {Function} callback Callback that receives boolean value - whether save is successful.
 * @return {MnemonicConfirmedAction} An action.
 */
export function mnemonicConfirmed(callback: (boolean) => void): MnemonicConfirmedAction {
  return {
    type: MNEMONIC_CONFIRMED,
    callback,
  };
}
