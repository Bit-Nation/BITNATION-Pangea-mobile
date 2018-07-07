// @flow

import {
  type Action,
  SHOW_CHAT_SPINNER,
  HIDE_CHAT_SPINNER,
  CHATS_UPDATED,
  SELECT_PROFILE,
} from '../actions/chat';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';

export type State = {
  +isFetching: boolean,
  chats: Array<any>,
  chatProfile: Object,
};

export const initialState: State = {
  isFetching: false,
  chats: [],
  chatProfile: {},
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
    case CHATS_UPDATED:
      return {
        ...state,
        chats: action.chats.slice(),
      };
    case SELECT_PROFILE:
      return {
        ...state,
        chatProfile: action.profile,
      };
    default:
      return state;
  }
};
