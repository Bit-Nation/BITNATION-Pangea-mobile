// @flow

import {
  type Action,
  SHOW_CHAT_SPINNER,
  HIDE_CHAT_SPINNER,
} from '../actions/chat';

type State = {
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
