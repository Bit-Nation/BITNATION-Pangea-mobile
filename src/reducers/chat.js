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
    case CHAT_MESSAGES_LOADED: {
      const { recipientPublicKey, messages } = action;
      const chats = state.chats.map((chat) => {
        if (chat.publicKey === recipientPublicKey) {
          return {
            ...chat,
            messages,
          };
        }
        return chat;
      });

      return {
        ...state,
        chats,
      };
    }
    case ADD_CHAT_MESSAGE: {
      const { publicKey, message } = action;
      const chats = state.chats.map((chat) => {
        if (chat.publicKey === publicKey) {
          const index = chat.messages.findIndex(existingMessage => existingMessage._id === message._id);
          if (index !== -1) {
            return chat;
          }

          return {
            ...chat,
            messages: [...chat.messages, message],
          };
        }
        return chat;
      });

      return {
        ...state,
        chats,
      };
    }
    default:
      return state;
  }
};
