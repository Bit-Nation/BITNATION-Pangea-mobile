// @flow

import {
  type Action,
  ACCOUNTS_LIST_UPDATED,
  CURRENT_ACCOUNT_ID_CHANGED,
  LOGIN_TASK_UPDATED,
} from '../actions/accounts';
import type { Account, EditingAccount } from '../types/Account';
import TaskBuilder, { type AsyncTask } from '../utils/asyncTask';

export type State = {
  +user: Account | null,
  +editingUser: EditingAccount | null,
  +creatingUser: EditingAccount | null,
  +currentAccountId: string | null,
  +login: AsyncTask<void>,
  +logout: AsyncTask<void>,
  +accounts: Array<Account>,
};

export const emptyProfile: EditingAccount = {
  id: null,
  name: null,
  location: null,
  avatar: null,
  accountStore: null,
  networkType: 'main',
};

export const initialState: State = {
  user: null,
  editingUser: null,
  creatingUser: null,
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

    default:
      return state;
  }
};
