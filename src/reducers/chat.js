// @flow

import {
  type Action,
  SHOW_CHAT_SPINNER,
  HIDE_CHAT_SPINNER,
} from '../actions/chat';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';

export type State = {
  +isFetching: boolean,
};

export const initialState: State = {
  isFetching: false,
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
    case SHOW_CHAT_SPINNER:
      return {
        ...state,
        isFetching: true,
      };
    case HIDE_CHAT_SPINNER:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
