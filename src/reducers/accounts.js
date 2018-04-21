// @flow

import { type Action } from '../actions/accounts';
import type { Account, EditingAccount } from '../types/Account';
import TaskBuilder, { type AsyncTask } from '../utils/asyncTask';

export type State = {
  +user: Account | null,
  +editingUser: EditingAccount | null,
  +currentAccountId: string | null,
  +login: AsyncTask<void>,
  +logout: AsyncTask<void>,
};

export const emptyProfile: EditingAccount = {
  id: null,
  name: null,
  location: null,
  avatar: null,
  networkType: 'main',
};

export const initialState: State = {
  user: null,
  editingUser: null,
  currentAccountId: null,
  login: TaskBuilder.empty(),
  logout: TaskBuilder.empty(),
};

/**
 * @desc Profile reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    default:
      return state;
  }
};
