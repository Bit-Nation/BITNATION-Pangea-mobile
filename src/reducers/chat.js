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
  CHANGE_UNREAD_STATUS,
  UNREAD_STATUS_CHANGED,
} from '../actions/chat';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';
import type { ChatSessionType } from '../types/Chat';
import { mergeMessages } from '../utils/chat';

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
            messages: mergeMessages(chat.messages, messages),
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
          return {
            ...chat,
            messages: mergeMessages(chat.messages, [message]),
          };
        }
        return chat;
      });

      return {
        ...state,
        chats,
      };
    }
    case CHANGE_UNREAD_STATUS: {
      const { publicKey, status } = action;
      const chats = state.chats.map((chat) => {
        if (chat.publicKey === publicKey) {
          return {
            ...chat,
            unreadMessages: status,
          };
        }
        return chat;
      });

      return {
        ...state,
        chats,
      };
    }
    case UNREAD_STATUS_CHANGED: {
      const { publicKey, status } = action;
      const chats = state.chats.map((chat) => {
        if (chat.publicKey === publicKey) {
          return {
            ...chat,
            unreadMessages: status,
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
