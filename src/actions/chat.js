import type { ProfileType, PreKeyBundleType, ChatSessionType } from '../types/Chat';

export const SHOW_CHAT_SPINNER = 'SHOW_CHAT_SPINNER';
export const HIDE_CHAT_SPINNER = 'HIDE_CHAT_SPINNER';
export const FIND_USER_BY_KEY = 'FIND_USER_BY_KEY';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const SAVE_PRE_KEY_BUNDLE = 'SAVE_PRE_KEY_BUNDLE';
export const NEW_CHAT_SESSION = 'NEW_CHAT_SESSION';
export const CHATS_UPDATED = 'CHATS_UPDATED';
export const ADD_CREATED_CHAT_SESSION = 'ADD_CREATED_CHAT_SESSION';
export const OPEN_CHAT_SESSION = 'OPEN_CHAT_SESSION';
export const SELECT_PROFILE = 'SELECT_PROFILE';
export const FETCH_ALL_CHATS = 'FETCH_ALL_CHATS';
export const START_LISTEN_FOR_MESSAGES = 'START_LISTEN_FOR_MESSAGES';
export const STOP_LISTEN_FOR_MESSAGES = 'STOP_LISTEN_FOR_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SAVE_HUMAN_MESSAGE = 'SAVE_HUMAN_MESSAGE';
export const LOAD_CHAT_MESSAGES = 'LOAD_CHAT_MESSAGES';
export const CHAT_MESSAGES_LOADED = 'CHAT_MESSAGES_LOADED';
export const PANTHALASSA_MESSAGE_PERSISTED = 'PANTHALASSA_MESSAGE_PERSISTED';
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';

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
  +initMessage: Object,
  +callback: () => void,
};
export type AddCreatedChatSessionAction = {
  +type: 'ADD_CREATED_CHAT_SESSION',
  +chat: ChatSessionType,
};
export type UpdateChatsAction = {
  +type: 'CHATS_UPDATED',
  +chats: Array<any>,
};
export type OpenChatAction = {
  +type: 'OPEN_CHAT_SESSION',
  +publicKey: string,
  +callback: () => void,
};
export type SelectProfileAction = {
  +type: 'SELECT_PROFILE',
  +profile: Object,
};
export type FetchAllChatsAction = {
  +type: 'FETCH_ALL_CHATS',
}
export type StartListenForMessagesAction = {
  +type: 'START_LISTEN_FOR_MESSAGES',
}
export type StopListenForMessagesAction = {
  +type: 'STOP_LISTEN_FOR_MESSAGES',
}
export type SendMessageAction = {
  +type: 'SEND_MESSAGE',
  +message: string,
  +session: Object,
  +callback: () => void,
};
export type SaveHumanMessageAction = {
  +type: 'SAVE_HUMAN_MESSAGE',
  +message: string,
};
export type SaveMessageAction = {
  +type: 'SAVE_HUMAN_MESSAGE',
  +message: string,
};
export type LoadChatMessagesAction = {
  +type: 'LOAD_CHAT_MESSAGES',
  +recipientPublicKey: string,
}
export type ChatMessagesLoadedAction = {
  +type: 'CHAT_MESSAGES_LOADED',
  +recipientPublicKey: string,
  +messages: Array<any>,
}
export type PanthalassaMessagePersistedAction = {
  +type: 'PANTHALASSA_MESSAGE_PERSISTED',
  +payload: Object,
}
export type AddChatMessageAction = {
  +type: 'ADD_CHAT_MESSAGE',
  +publicKey: string,
  +message: Object,
}

export type Action =
  | ShowSpinnerAction
  | HideSpinnerAction
  | FindUserByPubKeyAction
  | SaveProfileAction
  | SavePreKeyBundleAction
  | NewChatSessionAction
  | UpdateChatsAction
  | OpenChatAction
  | SelectProfileAction
  | FetchAllChatsAction
  | StartListenForMessagesAction
  | StopListenForMessagesAction
  | SendMessageAction
  | SaveMessageAction
  | LoadChatMessagesAction
  | ChatMessagesLoadedAction
  | PanthalassaMessagePersistedAction
  | AddChatMessageAction;

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
 * @returns {SaveProfileAction} An action
 */
export function saveProfile(profile: Object): SaveProfileAction {
  return {
    type: SAVE_PROFILE,
    profile,
  };
}

/**
 * @desc Action for saving a pre key bundle into database
 * @param {Object} preKeyBundle Pre key bundle object
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
 * @param {Object} profile Profile of the user
 * @param {func} callback Callback
 * @returns {NewChatSessionAction} An action.
 */
export function newChatSession(profile: Object, callback: () => void): NewChatSessionAction {
  return {
    type: NEW_CHAT_SESSION,
    profile,
    callback,
  };
}

/**
 * @desc Action for adding a newly created chat session
 * @param {Object} profile Profile of the user
 * @param {func} callback Callback
 * @returns {AddCreatedChatSessionAction} An action.
 */
export function addCreatedChatSession(chat: ChatSessionType): AddCreatedChatSessionAction {
  return {
    type: ADD_CREATED_CHAT_SESSION,
    chat,
  };
}

/**
 * @desc Action for updating chats
 * @param {Array<any>} chats Updated chats
 * @returns {UpdateChatsAction} An action
 */
export function chatsUpdated(chats: Array<any>): UpdateChatsAction {
  return {
    type: CHATS_UPDATED,
    chats,
  };
}

/**
 * @desc Action for opening chat session from the list
 * @param {string} publicKey Public Key of the chat session
 * @param {func} callback Callback
 * @returns {OpenChatAction} An action
 */
export function openChat(publicKey: string, callback: () => void): OpenChatAction {
  return {
    type: OPEN_CHAT_SESSION,
    publicKey,
    callback,
  };
}

/**
 * @desc Action for getting selected profile
 * @param {Object} profile Public Key of the chat session
 * @returns {SelectProfileAction} An action
 */
export function selectProfile(profile: Object): SelectProfileAction {
  return {
    type: SELECT_PROFILE,
    profile,
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
 * @desc Action to start listening for messages
 * @returns {StartListenForMessagesAction} An action
 */
export function startListenForMessages(): StartListenForMessagesAction {
  return {
    type: START_LISTEN_FOR_MESSAGES,
  };
}

/**
 * @desc Action to stop listening for messages
 * @returns {StopListenForMessagesAction} An action
 */
export function stopListenForMessages(): StopListenForMessagesAction {
  return {
    type: STOP_LISTEN_FOR_MESSAGES,
  };
}

/**
 * @desc Action for sending message
 * @param {string} recipientPublicKey The recipient's public key
 * @param {string} message Message to send
 * @param {func} callback Callback
 * @returns {SendMessageAction} An action
 */
export function sendMessage(recipientPublicKey: string, message: string, callback: () => void = () => undefined): SendMessageAction {
  return {
    type: SEND_MESSAGE,
    recipientPublicKey,
    message,
    callback,
  };
}

/**
 * @desc Action for saving human message
 * @param {string} message Message to send
 * @param {Object} session Session object
 * @returns {SaveHumanMessageAction} An action
 */
export function saveHumanMessage(message: Object, session: Object): SaveHumanMessageAction {
  return {
    type: SAVE_HUMAN_MESSAGE,
    message,
    session,
  };
}

/**
 * @desc Action for loading chat messages
 * @param {string} recipientPublicKey Public Key of the chat recipient
 * @returns {LoadChatMessagesAction} An action
 */
export function loadChatMessages(recipientPublicKey: string): LoadChatMessagesAction {
  return {
    type: LOAD_CHAT_MESSAGES,
    recipientPublicKey,
  };
}

/**
 * @desc Action for loaded messages
 * @param {string} recipientPublicKey The public key of the recipient 
 * @param {Array<any>} messages Loaded messages
 * @returns {ChatMessagesLoadedAction} An action
 */
export function chatMessagesLoaded(recipientPublicKey: string, messages: Array<any>): ChatMessagesLoadedAction {
  return {
    type: CHAT_MESSAGES_LOADED,
    recipientPublicKey,
    messages,
  };
}

/**
 * @desc Action for handling a panthalassa persisted message event
 * @param {Object} payload The event payload
 * @returns {PanthalassaMessagePersistedAction} An action
 */
export function panthalassaMessagePersisted(payload: Object): PanthalassaMessagePersistedAction {
  console.log('[CHAT MIGRATION] return PanthalassaMessagePersistedAction');
  return {
    type: PANTHALASSA_MESSAGE_PERSISTED,
    payload,
  };
}

/**
 * @desc Action for adding a chat message
 * @param {string} publicKey The chat public key
 * @param {Object} message The chat message
 * @returns {AddChatMessageAction} An action
 */
export function addChatMessage(publicKey: string, message: Object): AddChatMessageAction {
  console.log('MIGUEL GOT CALLED 2');
  return {
    type: ADD_CHAT_MESSAGE,
    publicKey,
    message,
  };
}
