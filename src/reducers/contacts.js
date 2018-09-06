// @flow

import { type Action } from '../actions/contacts';
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
 * @desc Activity reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SERVICES_DESTROYED:
      return initialState;
      // @todo Implement action handling
    default:
      return state;
  }
};

