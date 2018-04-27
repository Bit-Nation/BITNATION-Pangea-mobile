/* eslint-disable no-use-before-define */
// @flow

import _ from 'lodash';

import {
  type Action,
  ACCOUNTS_LIST_UPDATED,
  CURRENT_ACCOUNT_ID_CHANGED,
  LOGIN_TASK_UPDATED,
} from '../actions/accounts';
import type { Account, EditingAccount } from '../types/Account';
import TaskBuilder, { type AsyncTask } from '../utils/asyncTask';
import { CANCEL_ACCOUNT_EDITING, CHANGE_EDITING_ACCOUNT, DONE_ACCOUNT_EDITING, START_ACCOUNT_EDITING } from '../actions/profile';

export type State = {
  +editingAccount: Account | null,
  +creatingAccount: EditingAccount | null,
  +currentAccountId: string | null,
  +login: AsyncTask<void>,
  +logout: AsyncTask<void>,
  +accounts: Array<Account>,
};

export const emptyAccount: EditingAccount = {
  id: null,
  name: null,
  location: null,
  avatar: null,
  accountStore: null,
  networkType: 'main',
};

export const initialState: State = {
  editingAccount: null,
  creatingAccount: null,
  currentAccountId: null,
  login: TaskBuilder.empty(),
  logout: TaskBuilder.empty(),
  accounts: [],
};

/**
 * @desc Profile reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ACCOUNTS_LIST_UPDATED:
      return {
        ...state,
        accounts: action.accounts,
      };
    case CURRENT_ACCOUNT_ID_CHANGED:
      return {
        ...state,
        currentAccountId: null,
      };
    case LOGIN_TASK_UPDATED:
      return {
        ...state,
        login: action.asyncTask,
      };

    case START_ACCOUNT_EDITING:
      return {
        ...state,
        editingAccount: getCurrentAccount(state),
      };
    case CHANGE_EDITING_ACCOUNT:
      return {
        ...state,
        editingAccount: action.account,
      };
    case CANCEL_ACCOUNT_EDITING:
      return {
        ...state,
        editingAccount: null,
      };
    case DONE_ACCOUNT_EDITING: {
      return {
        ...state,
        editingAccount: null,
      };
    }

    default:
      return state;
  }
};

export const getCurrentAccount = (state: State) =>
  _.find(state.accounts, account => account.id === state.currentAccountId) || null;
