// @flow

import type { ProfileType, ChatType, GiftedChatMessageType } from './Chat-types';
import { CHAT_MESSAGES_PAGE } from 'pangea-common/Constants';

export const SHOW_CHAT_SPINNER = 'SHOW_CHAT_SPINNER';
export const HIDE_CHAT_SPINNER = 'HIDE_CHAT_SPINNER';
export const START_NEW_CHAT = 'START_NEW_CHAT';
export const CHATS_UPDATED = 'CHATS_UPDATED';
export const OPEN_CHAT = 'OPEN_CHAT';
export const FETCH_ALL_CHATS = 'FETCH_ALL_CHATS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const LOAD_CHAT_MESSAGES = 'LOAD_CHAT_MESSAGES';
export const CHAT_MESSAGES_LOADED = 'CHAT_MESSAGES_LOADED';
export const PANTHALASSA_MESSAGE_PERSISTED = 'PANTHALASSA_MESSAGE_PERSISTED';
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
export const CHANGE_UNREAD_STATUS = 'CHANGE_UNREAD_STATUS';
export const UNREAD_STATUS_CHANGED = 'UNREAD_STATUS_CHANGED';
export const ADD_PARTNER_PROFILES = 'ADD_PARTNER_PROFILES';

export type ShowSpinnerAction = { +type: 'SHOW_CHAT_SPINNER' };
export type HideSpinnerAction = { +type: 'HIDE_CHAT_SPINNER' };
export type StartNewChatAction = { +type: 'START_NEW_CHAT', partnersIdentityKeys: Array<string>, groupChatName: string | null, +callback: (success: boolean) => void };
export type ChatsUpdatedAction = { +type: 'CHATS_UPDATED', +chats: Array<ChatType> };
export type OpenChatAction = { +type: 'OPEN_CHAT', +chatId: number };
export type FetchAllChatsAction = { +type: 'FETCH_ALL_CHATS' }
export type SendMessageAction = { +type: 'SEND_MESSAGE', +message: string, +chatId: number };
export type LoadChatMessagesAction = { +type: 'LOAD_CHAT_MESSAGES', +chatId: number, +fromMessageId: string, +count: number }
export type ChatMessagesLoadedAction = { +type: 'CHAT_MESSAGES_LOADED', +chatId: number, +messages: Array<GiftedChatMessageType>, +expectedCount: number }
export type PanthalassaMessagePersistedAction = { +type: 'PANTHALASSA_MESSAGE_PERSISTED', +payload: Object }
export type AddChatMessageAction = { +type: 'ADD_CHAT_MESSAGE', +chatId: number, +message: GiftedChatMessageType }
export type ChangeUnreadStatusAction = { +type: 'CHANGE_UNREAD_STATUS', +chatId: number, +hasUnreadMessages: boolean }
export type UnreadStatusChangedAction = { +type: 'UNREAD_STATUS_CHANGED', +chatId: number, +hasUnreadMessages: boolean }
export type AddPartnerProfilesAction = { +type: 'ADD_PARTNER_PROFILES', +profiles: Array<ProfileType> }

export type Action =
  | ShowSpinnerAction
  | HideSpinnerAction
  | StartNewChatAction
  | ChatsUpdatedAction
  | OpenChatAction
  | FetchAllChatsAction
  | SendMessageAction
  | LoadChatMessagesAction
  | ChatMessagesLoadedAction
  | PanthalassaMessagePersistedAction
  | AddChatMessageAction
  | ChangeUnreadStatusAction
  | UnreadStatusChangedAction
  | AddPartnerProfilesAction;

/**
 * @desc Action for an action that shows spinner while processing in background
 * @returns {ShowSpinnerAction} An action
 */
export function showSpinner(): ShowSpinnerAction {
  return {
    type: SHOW_CHAT_SPINNER,
  };
}

/**
 * @desc Action for an action that hide spinner after the process is completed
 * @returns {HideSpinnerAction} An action
 */
export function hideSpinner(): HideSpinnerAction {
  return {
    type: HIDE_CHAT_SPINNER,
  };
}

/**
 * @desc Action for creating a new chat.
 * @param {string[]} partnersIdentityKeys Identity keys of users that will be on the chat (one or more)
 * @param {string} groupChatName Chat name for the group chat only.
 * @param {function} callback Callback
 * @returns {StartNewChatAction} An action.
 */
export function startNewChat(partnersIdentityKeys: Array<string>, groupChatName: string | null, callback: (success: boolean) => void): StartNewChatAction {
  return {
    type: START_NEW_CHAT,
    partnersIdentityKeys,
    groupChatName,
    callback,
  };
}

/**
 * @desc Action for updating chats
 * @param {Array<ChatType>} chats Updated chats
 * @returns {ChatsUpdatedAction} An action
 */
export function chatsUpdated(chats: Array<ChatType>): ChatsUpdatedAction {
  return {
    type: CHATS_UPDATED,
    chats,
  };
}

/**
 * @desc Action creator for an action that sets currently opened chat.
 * @param {number} chatId Id of chat to open.
 * @returns {OpenChatAction} An action
 */
export function openChat(chatId: number): OpenChatAction {
  return {
    type: OPEN_CHAT,
    chatId,
  };
}

/**
 * @desc Action to fetch all chats
 * @returns {FetchAllChatsAction} An action
 */
export function fetchAllChats(): FetchAllChatsAction {
  return {
    type: FETCH_ALL_CHATS,
  };
}

/**
 * @desc Action create for an action that initiates message sending.
 * @param {number} chatId Id of chat to send message to.
 * @param {string} message Plain message to send
 * @returns {SendMessageAction} An action
 */
export function sendMessage(chatId: number, message: string): SendMessageAction {
  return {
    type: SEND_MESSAGE,
    chatId,
    message,
  };
}

/**
 * @desc Action creator for an action that initiates chat messages loading.
 * @param {number} chatId Id of chat to fetch messages for.
 * @param {string} fromMessageId Id of message to start load from
 * @param {number} count Count of messages to fetch.
 * @returns {LoadChatMessagesAction} An action
 */
export function loadChatMessages(chatId: number, fromMessageId: string = '0', count: number = CHAT_MESSAGES_PAGE): LoadChatMessagesAction {
  return {
    type: LOAD_CHAT_MESSAGES,
    chatId,
    fromMessageId,
    count,
  };
}

/**
 * @desc Action create for an action that is called when chat messages are loaded.
 * @param {number} chatId Id of chat messages are loaded for.
 * @param {GiftedChatMessageType[]} messages Loaded messages
 * @param {number} expectedCount Number of message that was requested. Used to determine if there are older messages.
 * @returns {ChatMessagesLoadedAction} An action
 */
export function chatMessagesLoaded(chatId: number, messages: Array<GiftedChatMessageType>, expectedCount: number): ChatMessagesLoadedAction {
  return {
    type: CHAT_MESSAGES_LOADED,
    chatId,
    messages,
    expectedCount,
  };
}

/**
 * @desc Action for handling a panthalassa persisted message event
 * @param {Object} payload The event payload
 * @returns {PanthalassaMessagePersistedAction} An action
 */
export function panthalassaMessagePersisted(payload: Object): PanthalassaMessagePersistedAction {
  return {
    type: PANTHALASSA_MESSAGE_PERSISTED,
    payload,
  };
}

/**
 * @desc Action creator for an action that adds new single chat message
 * @param {number} chatId Id of chat that message should be added to.
 * @param {GiftedChatMessageType} message The chat message
 * @returns {AddChatMessageAction} An action
 */
export function addChatMessage(chatId: number, message: GiftedChatMessageType): AddChatMessageAction {
  return {
    type: ADD_CHAT_MESSAGE,
    chatId,
    message,
  };
}

/**
 * @desc Action creator for an action that requests change a conversation's new messages flag
 * @param {number} chatId Id of chat to change status for.
 * @param {boolean} hasUnreadMessages Status flag for new messages on chat
 * @returns {ChangeUnreadStatusAction} An action
 */
export function changeUnreadStatus(chatId: number, hasUnreadMessages: boolean): ChangeUnreadStatusAction {
  return {
    type: CHANGE_UNREAD_STATUS,
    chatId,
    hasUnreadMessages,
  };
}

/**
 * @desc Action creator for an action that is called when conversation's new messages flag is changed
 * @param {number} chatId Id of chat that status is changed for.
 * @param {boolean} hasUnreadMessages Status flag for new messages on chat
 * @returns {UnreadStatusChangedAction} An action
 */
export function unreadStatusChanged(chatId: number, hasUnreadMessages: boolean): UnreadStatusChangedAction {
  return {
    type: UNREAD_STATUS_CHANGED,
    chatId,
    hasUnreadMessages,
  };
}

/**
 * @desc Action creator for an action that is called when new partners profiles need to be saved on Redux state.
 * @param {ProfileType[]} profiles List of profiles to add to Redux state.
 * @returns {AddPartnerProfilesAction} An action
 */
export function addPartnerProfiles(profiles: Array<ProfileType>): AddPartnerProfilesAction {
  return {
    type: ADD_PARTNER_PROFILES,
    profiles,
  };
}
