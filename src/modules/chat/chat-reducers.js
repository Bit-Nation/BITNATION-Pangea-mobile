// @flow

import {
  type Action,
  SHOW_CHAT_SPINNER,
  HIDE_CHAT_SPINNER,
  CHATS_UPDATED,
  CHAT_MESSAGES_LOADED,
  ADD_CHAT_MESSAGE,
  UNREAD_STATUS_CHANGED,
  OPEN_CHAT, ADD_PARTNER_PROFILES,
} from './chat-actions';
import { SERVICES_DESTROYED } from 'pangea-common/serviceContainer-actions';
import type { ChatType, ProfileType } from './chat-types';
import { mergeMessages } from './chat-utils';

export type State = {
  +isFetching: boolean,
  +chats: Array<ChatType>,
  +openedChatId: number | null,
  +partnerProfiles: { [string]: ProfileType }
};

export const initialState: State = {
  isFetching: false,
  chats: [],
  openedChatId: null,
  partnerProfiles: {},
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
    case ADD_PARTNER_PROFILES: {
      const newProfiles = {};
      action.profiles.forEach(profile => (newProfiles[profile.identityKey] = profile));

      return {
        ...state,
        partnerProfiles: {
          ...state.partnerProfiles,
          ...newProfiles,
        },
      };
    }
    case HIDE_CHAT_SPINNER:
      return {
        ...state,
        isFetching: false,
      };
    case CHATS_UPDATED:
      return {
        ...state,
        chats: [...action.chats],
      };
    case CHAT_MESSAGES_LOADED: {
      const { chatId, messages } = action;
      const chats = state.chats.map((chat) => {
        if (chat.id === chatId) {
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
      const { chatId, message } = action;
      const chats = state.chats.map((chat) => {
        if (chat.id === chatId) {
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
    case UNREAD_STATUS_CHANGED: {
      const { chatId, hasUnreadMessages } = action;
      const chats = state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            unreadMessages: hasUnreadMessages,
          };
        }
        return chat;
      });

      return {
        ...state,
        chats,
      };
    }
    case OPEN_CHAT:
      return {
        ...state,
        openedChatId: action.chatId,
      };
    default:
      return state;
  }
};

export const getChatById = (state: State, id: number) => state.chats.find(chat => chat.id === id) || null;
export const getProfile = (state: State, identityKey: string) => state.partnerProfiles[identityKey] || null;
