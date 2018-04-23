// @flow

import type { Account } from '../types/Account';

type StartAccountEditingAction = { +type: 'START_ACCOUNT_EDITING', +account: Account };
type ChangeEditingAccountAction = { +type: 'CHANGE_EDITING_ACCOUNT', +account: Account };
type CancelAccountEditingAction = { +type: 'CANCEL_ACCOUNT_EDITING' };
type DoneAccountEditingAction = { +type: 'DONE_ACCOUNT_EDITING' };

export type Action =
  | StartAccountEditingAction
  | ChangeEditingAccountAction
  | CancelAccountEditingAction
  | DoneAccountEditingAction

export const START_ACCOUNT_EDITING = 'START_ACCOUNT_EDITING';
export const CHANGE_EDITING_ACCOUNT = 'CHANGE_EDITING_ACCOUNT';
export const DONE_ACCOUNT_EDITING = 'DONE_ACCOUNT_EDITING';
export const CANCEL_ACCOUNT_EDITING = 'CANCEL_ACCOUNT_EDITING';

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
