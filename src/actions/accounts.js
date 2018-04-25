// @flow

import { type Account } from '../types/Account';
import type { AsyncTask } from '../utils/asyncTask';

export type AccountsListUpdatedAction = { +type: 'ACCOUNTS_LIST_UPDATED', accounts: Array<Account> };
export type CurrentAccountIdChangedAction = { +type: 'CURRENT_ACCOUNT_ID_CHANGED', currentAccountId: string | null };
export type LoginAction = { +type: 'LOGIN', accountId: string, password: string };
export type LoginTaskUpdatedAction = { +type: 'LOGIN_TASK_UPDATED', asyncTask: AsyncTask<void> };
export type LogoutAction = { +type: 'LOGOUT' };
export type CheckPinCodeAction = { +type: 'CHECK_PIN_CODE', +pinCode: string, +callback: (success: boolean) => void };
export type CheckPasswordAction = { +type: 'CHECK_PASSWORD', +password: string, +callback: (success: boolean) => void };

export type Action =
  | AccountsListUpdatedAction
  | CurrentAccountIdChangedAction
  | LoginAction
  | LoginTaskUpdatedAction
  | LogoutAction
  | CheckPinCodeAction
  | CheckPasswordAction;

export const ACCOUNTS_LIST_UPDATED = 'ACCOUNTS_LIST_UPDATED';
export const CURRENT_ACCOUNT_ID_CHANGED = 'CURRENT_ACCOUNT_ID_CHANGED';
export const LOGIN = 'LOGIN';
export const LOGIN_TASK_UPDATED = 'LOGIN_TASK_UPDATED';
export const LOGOUT = 'LOGOUT';
export const CHECK_PIN_CODE = 'CHECK_PIN_CODE';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';

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
 * @return {LoginAction} An action.
 */
export function login(accountId: string, password: string): LoginAction {
  return {
    type: LOGIN,
    accountId,
    password,
  };
}

/**
 * @desc Action creator for an action that is called when login task status updated.
 * @param {AsyncTask<void>} asyncTask Updated async task.
 * @return {LoginTaskUpdatedAction} An action.
 */
export function loginTaskUpdated(asyncTask: AsyncTask<void>): LoginTaskUpdatedAction {
  return {
    type: LOGIN_TASK_UPDATED,
    asyncTask,
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
 * @desc Action creator for an action that is called to check entered pin code.
 * @param {string} pinCode Pin code to check.
 * @param {function} callback Callback that is called with true if check is successful and false otherwise.
 * @return {CheckPinCodeAction} An action.
 */
export function checkPinCode(pinCode: string, callback: (boolean) => void): CheckPinCodeAction {
  return {
    type: CHECK_PIN_CODE,
    pinCode,
    callback,
  };
}

/**
 * @desc Action creator for an action that is called to check entered password.
 * @param {string} password Password to check.
 * @param {function} callback Callback that is called with true if check is successful and false otherwise.
 * @return {CheckPinCodeAction} An action.
 */
export function checkPassword(password: string, callback: (boolean) => void): CheckPasswordAction {
  return {
    type: CHECK_PASSWORD,
    password,
    callback,
  };
}
