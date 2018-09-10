// @flow

import {
  type Action,
  START_CONTACTS_FETCH,
  CONTACTS_FETCH_FAILED,
  CONTACTS_UPDATED,
  ADD_CONTACT,
} from '../actions/contacts';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';
import type { Contact } from '../types/Contacts';

export type State = {
  isFetching: boolean,
  contacts: Array<Contact>,
};

export const initialState: State = {
  isFetching: false,
  contacts: [],
};

/**
 * @desc Contacts reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SERVICES_DESTROYED:
      return initialState;
    case START_CONTACTS_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchError: null,
      };
    case CONTACTS_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        fetchError: action.error,
      };
    case CONTACTS_UPDATED:
      return {
        ...state,
        isFetching: false,
        contacts: [...action.contacts],
      };
    case ADD_CONTACT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
