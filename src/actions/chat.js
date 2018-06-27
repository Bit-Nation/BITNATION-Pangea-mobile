import type { ProfileType, PreKeyBundleType } from '../types/Chat';

export const SHOW_CHAT_SPINNER = 'SHOW_CHAT_SPINNER';
export const HIDE_CHAT_SPINNER = 'HIDE_CHAT_SPINNER';
export const FIND_USER_BY_KEY = 'FIND_USER_BY_KEY';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const SAVE_PRE_KEY_BUNDLE = 'SAVE_PRE_KEY_BUNDLE';
export const NEW_CHAT_SESSION = 'NEW_CHAT_SESSION';
export const CHATS_UPDATED = 'CHATS_UPDATED';

export type ShowSpinnerAction = { +type: 'SHOW_CHAT_SPINNER' };
export type HideSpinnerAction = { +type: 'HIDE_CHAT_SPINNER' };
export type FindUserByPubKeyAction = {
  +type: 'FIND_USER_BY_KEY',
  +key: string
};
export type SaveProfileAction = {
  +type: 'SAVE_PROFILE',
  +profile: ProfileType
};
export type SavePreKeyBundleAction = {
  +type: 'SAVE_PRE_KEY_BUNDLE',
  +profile: PreKeyBundleType
};
export type NewChatSessionAction = {
  +type: 'NEW_CHAT_SESSION',
  +publicKey: string,
  +initMessage: Object
};
export type UpdateChatsAction = {
  +type: 'CHATS_UPDATED',
  +chats: any
};

export type Action =
  | ShowSpinnerAction
  | HideSpinnerAction
  | FindUserByPubKeyAction
  | SaveProfileAction
  | SavePreKeyBundleAction
  | NewChatSessionAction
  | UpdateChatsAction;

/**
 * @desc Action for an action that shows spinner while processing in background
 * @returns {ShowSpinnerAction} An action.
 */
export function showSpinner(): ShowSpinnerAction {
  return {
    type: SHOW_CHAT_SPINNER,
  };
}

/**
 * @desc Action for an action that hide spinner after the process is completed
 * @returns {HideSpinnerAction} An action.
 */
export function hideSpinner(): HideSpinnerAction {
  return {
    type: HIDE_CHAT_SPINNER,
  };
}

/**
 * @desc Action for an action that find a user to chat with
 * @param {string} key Public key of the user
 * @returns {FindUserByPubKeyAction} An action.
 */
export function findUserByPublicKey(key: string): FindUserByPubKeyAction {
  return {
    type: FIND_USER_BY_KEY,
    key,
  };
}

/**
 * @desc Action for saving a user profile into database
 * @param {Object} profile profile object
 * @returns {SaveProfileAction} An action.
 */
export function saveProfile(profile: Object): SaveProfileAction {
  return {
    type: SAVE_PROFILE,
    profile,
  };
}

/**
 * @desc Action for saving a pre key bundle into database
 * @param {Object} bundle Pre key bundle object
 * @returns {SavePreKeyBundleAction} An action.
 */
export function savePreKeyBundle(preKeyBundle: Object): SavePreKeyBundleAction {
  return {
    type: SAVE_PRE_KEY_BUNDLE,
    preKeyBundle,
  };
}

/**
 * @desc Action for creating a new chat session
 * @param {Object} profile Public key of the user
 * @param {Object} initMessage Initialization message
 * @returns {NewChatSessionAction} An action.
 */
export function newChatSession(profile: Object, initMessage: Object): NewChatSessionAction {
  return {
    type: NEW_CHAT_SESSION,
    profile,
    initMessage,
  };
}

/**
 * @desc Action for updating chats
 * @param {any} chats Updated chats
 * @returns {UpdateChatsAction} An action.
 */
export function chatsUpdated(chats: any): UpdateChatsAction {
  return {
    type: CHATS_UPDATED,
    chats,
  };
}
