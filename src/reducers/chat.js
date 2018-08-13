// @flow

import {
  type Action,
  SHOW_CHAT_SPINNER,
  HIDE_CHAT_SPINNER,
  CHATS_UPDATED,
  SELECT_PROFILE,
  ADD_CREATED_CHAT_SESSION,
  CHAT_MESSAGES_LOADED,
  ADD_CHAT_MESSAGE,
} from '../actions/chat';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';
import type { ChatSessionType } from '../types/Chat';

export type State = {
  +isFetching: boolean,
  chats: Array<ChatSessionType>,
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
  let chats;

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
    case ADD_CREATED_CHAT_SESSION:
      return {
        ...state,
        chats: [...state.chats, action.chat],
      };
    case SELECT_PROFILE:
      return {
        ...state,
        chatProfile: action.profile,
      };
    case CHAT_MESSAGES_LOADED:
      chats = state.chats.map((chat) => {
        if (chat.publicKey === action.recipientPublicKey) {
          return {
            ...chat,
            messages: action.messages,
          };
        }
        return chat;
      });

      return {
        ...state,
        chats,
      };
    case ADD_CHAT_MESSAGE:
      chats = state.chats.map((chat) => {
        if (chat.publicKey === action.publicKey) {
          const index = chat.messages.findIndex(message => action.message._id === message._id);
          if (index !== -1) {
            return chat;
          }

          return {
            ...chat,
            messages: [...chat.messages, action.message],
          };
        }
        return chat;
      });

      return {
        ...state,
        chats,
      };
    default:
      return state;
  }
};
