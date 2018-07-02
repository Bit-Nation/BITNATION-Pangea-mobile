// @flow

import type { Account } from '../types/Account';

export type StartAccountEditingAction = { +type: 'START_ACCOUNT_EDITING', +account: Account };
export type ChangeEditingAccountAction = { +type: 'CHANGE_EDITING_ACCOUNT', +account: Account };
export type CancelAccountEditingAction = { +type: 'CANCEL_ACCOUNT_EDITING' };
export type DoneAccountEditingAction = { +type: 'DONE_ACCOUNT_EDITING' };
export type SaveEditingAccountAction = { +type: 'SAVE_EDITING_ACCOUNT', +account: Account };
export type SetPublicKeyAction = { +type: 'SET_PUBLIC_KEY', +publicKey: string };

export type Action =
  | StartAccountEditingAction
  | ChangeEditingAccountAction
  | CancelAccountEditingAction
  | DoneAccountEditingAction
  | SaveEditingAccountAction
  | SetPublicKeyAction;

export const START_ACCOUNT_EDITING = 'START_ACCOUNT_EDITING';
export const CHANGE_EDITING_ACCOUNT = 'CHANGE_EDITING_ACCOUNT';
export const DONE_ACCOUNT_EDITING = 'DONE_ACCOUNT_EDITING';
export const CANCEL_ACCOUNT_EDITING = 'CANCEL_ACCOUNT_EDITING';
export const SAVE_EDITING_ACCOUNT = 'SAVE_EDITING_ACCOUNT';
export const SET_PUBLIC_KEY = 'SET_PUBLIC_KEY';

/**
 * @desc Action creator for an action that should be called to start account editing.
 * @param {Account} account Account to be edited.
 * @returns {StartAccountEditingAction} An action.
 */
export function startAccountEditing(account: Account): StartAccountEditingAction {
  return {
    type: START_ACCOUNT_EDITING,
    account,
  };
}

/**
 * @desc Action creator for an action that changes currently edit account with new value.
 * @param {Account} account New account value.
 * @returns {ChangeEditingAccountAction} An action.
 */
export function changeEditingAccount(account: Account): ChangeEditingAccountAction {
  return {
    type: CHANGE_EDITING_ACCOUNT,
    account,
  };
}

/**
 * @desc Action creator for an action that should be called to cancel account editing.
 * @returns {CancelAccountEditingAction} An action.
 */
export function cancelAccountEditing(): CancelAccountEditingAction {
  return {
    type: CANCEL_ACCOUNT_EDITING,
  };
}

/**
 * @desc Action creator for an action that should be called on done account editing.
 * @returns {DoneAccountEditingAction} An action.
 */
export function doneAccountEditing(): DoneAccountEditingAction {
  return {
    type: DONE_ACCOUNT_EDITING,
  };
}

/**
 * @desc Action creator for an action that should be called to save account to database.
 * @param {Account} account Account information to update current account.
 * @returns {SaveEditingAccountAction} An action.
 */
export function saveEditingAccount(account: Account): SaveEditingAccountAction {
  return {
    type: SAVE_EDITING_ACCOUNT,
    account,
  };
}

/**
 * @desc Action creator for an action that save the public key.
 * @param {string} publicKey Public key of the current account.
 * @returns {SetPublicKeyAction} An action.
 */
export function setPublicKey(publicKey: string): SetPublicKeyAction {
  return {
    type: SET_PUBLIC_KEY,
    publicKey,
  };
}
