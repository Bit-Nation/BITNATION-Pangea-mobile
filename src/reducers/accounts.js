/* eslint-disable no-use-before-define */
// @flow

import _ from 'lodash';
import uuid from 'uuid4';

import {
  type Action as AccountsAction,
  ACCOUNTS_LIST_UPDATED,
  CURRENT_ACCOUNT_ID_CHANGED,
  LOGIN_TASK_UPDATED,
  START_ACCOUNT_CREATION,
  CHANGE_CREATING_ACCOUNT_FIELD,
  START_RESTORE_ACCOUNT_USING_MNEMONIC,
  SAVE_CREATING_ACCOUNT, SET_CURRENT_ACCOUNT_IDENTITY_KEY,
} from '../actions/accounts';
import type { Account, PartialAccount } from '../types/Account';
import TaskBuilder, { type AsyncTask } from '../utils/asyncTask';
import {
  type Action as ProfileAction,
  CANCEL_ACCOUNT_EDITING,
  CHANGE_EDITING_ACCOUNT,
  DONE_ACCOUNT_EDITING,
  START_ACCOUNT_EDITING,
  SET_PUBLIC_KEY,
} from '../actions/profile';
import type { Mnemonic } from '../types/Mnemonic';

export type State = {
  +editingAccount: Account | PartialAccount | null,
  +creatingAccount: PartialAccount | null,
  +currentAccountId: string | null,
  +login: AsyncTask<void>,
  +logout: AsyncTask<void>,
  +accounts: Array<Account>,
  +currentCreation: | { type: 'create' }
    | { type: 'restore', mnemonic: Mnemonic }
    | null,
  +currentAccountIdentityKey: string | null;
};

export const buildEmptyAccount = (): PartialAccount => ({
  id: uuid(),
  name: null,
  location: null,
  avatar: null,
  accountStore: null,
  networkType: 'main',
});

export const initialState: State = {
  editingAccount: null,
  creatingAccount: null,
  currentAccountId: null,
  login: TaskBuilder.empty(),
  logout: TaskBuilder.empty(),
  accounts: [],
  currentCreation: null,
  currentAccountIdentityKey: null,
};

/**
 * @desc Profile reducer.
 * @param {State} state Current state.
 * @param {AccountsAction|ProfileAction} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: AccountsAction | ProfileAction): State => {
  switch (action.type) {
    case ACCOUNTS_LIST_UPDATED:
      return {
        ...state,
        accounts: action.accounts,
      };
    case CURRENT_ACCOUNT_ID_CHANGED:
      return {
        ...state,
        currentAccountId: action.currentAccountId,
        currentAccountIdentityKey: action.currentAccountId === null ? null : state.currentAccountIdentityKey,
      };
    case SET_CURRENT_ACCOUNT_IDENTITY_KEY:
      return {
        ...state,
        currentAccountIdentityKey: action.identityKey,
      };
    case LOGIN_TASK_UPDATED:
      return {
        ...state,
        login: action.loginTask,
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
    case START_ACCOUNT_CREATION: {
      const newAccount = buildEmptyAccount();
      return {
        ...state,
        currentCreation: { type: 'create' },
        creatingAccount: newAccount,
        editingAccount: newAccount,
      };
    }
    case CHANGE_CREATING_ACCOUNT_FIELD: {
      return {
        ...state,
        creatingAccount: {
          ...state.creatingAccount,
          [action.field]: action.value,
        },
      };
    }
    case START_RESTORE_ACCOUNT_USING_MNEMONIC: {
      const newAccount = buildEmptyAccount();
      return {
        ...state,
        currentCreation: { type: 'restore', mnemonic: action.mnemonic },
        creatingAccount: newAccount,
        editingAccount: newAccount,
      };
    }
    case SAVE_CREATING_ACCOUNT: {
      return {
        ...state,
        currentCreation: null,
      };
    }
    case SET_PUBLIC_KEY: {
      return {
        ...state,
        publicKey: action.publicKey,
      };
    }
    default:
      return state;
  }
};

export const getCurrentAccount = (state: State) =>
  _.find(state.accounts, account => account.id === state.currentAccountId) || null;

export const isCreatingAccount = (state: State) =>
  state.currentAccountId === null && state.creatingAccount !== null;
