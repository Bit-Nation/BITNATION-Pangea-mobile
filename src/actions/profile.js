// @flow

import type { Account } from '../types/Account';

export type StartAccountEditingAction = { +type: 'START_ACCOUNT_EDITING', +account: Account };
export type ChangeEditingAccountAction = { +type: 'CHANGE_EDITING_ACCOUNT', +account: Account };
export type CancelAccountEditingAction = { +type: 'CANCEL_ACCOUNT_EDITING' };
export type DoneAccountEditingAction = { +type: 'DONE_ACCOUNT_EDITING' };
export type SaveAccountAction = { +type: 'SAVE_ACCOUNT', +account: Account };

export type Action =
  | StartAccountEditingAction
  | ChangeEditingAccountAction
  | CancelAccountEditingAction
  | DoneAccountEditingAction
  | SaveAccountAction;

export const START_ACCOUNT_EDITING = 'START_ACCOUNT_EDITING';
export const CHANGE_EDITING_ACCOUNT = 'CHANGE_EDITING_ACCOUNT';
export const DONE_ACCOUNT_EDITING = 'DONE_ACCOUNT_EDITING';
export const CANCEL_ACCOUNT_EDITING = 'CANCEL_ACCOUNT_EDITING';
export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';

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
 * @param {Account} account Account to be updated.
 * @returns {SaveAccountAction} An action.
 */
export function saveAccount(account: Account): SaveAccountAction {
  return {
    type: SAVE_ACCOUNT,
    account,
  };
}
