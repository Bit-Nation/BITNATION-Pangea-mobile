// @flow

import {
  type Action,
  START_USER_EDITING,
  CHANGE_EDITING_USER,
  DONE_USER_EDITING,
  CANCEL_USER_EDITING, START_USER_CREATING,
  SET_USER_PROFILE,
} from '../actions/profile';
import { type ProfileType } from '../types/Profile';

export type State = {
  +user: ProfileType | null,
  +editingUser: ProfileType | null,
}

export const emptyProfile: ProfileType = {
  name: null,
  location: null,
  avatar: null,
};

export const initialState: State = {
  user: null,
  editingUser: null,
};

/**
 * @desc Profile reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case START_USER_EDITING:
      return {
        ...state,
        editingUser: state.user,
      };
    case CHANGE_EDITING_USER:
      return {
        ...state,
        editingUser: action.user,
      };
    case CANCEL_USER_EDITING:
      return {
        ...state,
        editingUser: null,
      };
    case DONE_USER_EDITING: {
      const { editingUser } = state;
      if (editingUser === null) {
        return state;
      }

      const newUser = {
        ...editingUser,
        name: editingUser.name ? editingUser.name.trim() : '',
        location: editingUser.location ? editingUser.location.trim() : '',
      };
      return {
        ...state,
        user: newUser,
        editingUser: null,
      };
    }
    case START_USER_CREATING:
      return {
        ...state,
        editingUser: emptyProfile,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
