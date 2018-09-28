// @flow

import { put, call, select } from 'redux-saga/effects';
import { Buffer } from 'buffer/index';

import type {
  StartNewChatAction,
  SendMessageAction,
  LoadChatMessagesAction,
  PanthalassaMessagePersistedAction,
  ChangeUnreadStatusAction,
} from '../../actions/chat';
import {
  chatsUpdated,
  chatMessagesLoaded,
  addChatMessage,
  showSpinner,
  hideSpinner,
  unreadStatusChanged,
  openChat,
  addPartnerProfiles, fetchAllChats,
} from '../../actions/chat';
import defaultDB from '../../services/database';
import ChatService from '../../services/chat';
import { getCurrentAccount } from '../accounts/sagas';
import { createGiftedChatMessageObject } from '../../utils/chat';
import { panthalassaEthPubToAddress, panthalassaMarkMessagesAsRead } from '../../services/panthalassa';
import type { ChatType, ProfileType, PanthalassaChatType, GiftedChatMessageType } from '../../types/Chat';
import { getChatById } from '../../reducers/chat';

/**
 * @desc Save profile into database.
 * @param {Object} profileObject Profile object
 * @return {void}
 */
async function saveProfileIntoDatabase(profileObject: Object) {
  const db = await defaultDB;
  const isProfileOnDb = db.objects('Profile').filtered(`identityKey == '${profileObject.ethereumPubKey}'`);

  if (isProfileOnDb.length > 0) {
    return isProfileOnDb[0];
  }

  const ethereumPublicKey = Buffer.from(profileObject.ethereumPubKey, 'base64').toString('hex');
  const ethereumAddress = await panthalassaEthPubToAddress(ethereumPublicKey);
  const profile = {
    name: profileObject.name,
    location: profileObject.location || '',
    image: profileObject.image || '',
    identityKey: Buffer.from(profileObject.identityPubKey, 'base64').toString('hex'),
    ethereumPublicKey,
    ethereumAddress,
    chatIdKey: Buffer.from(profileObject.chatIdentityPubKey, 'base64').toString('hex'),
    timestamp: new Date(1000 * profileObject.timestamp),
    version: profileObject.version,
    identityKeySignature: Buffer.from(profileObject.identityKeySignature, 'base64').toString('hex'),
    ethereumKeySignature: Buffer.from(profileObject.ethereumKeySignature, 'base64').toString('hex'),
  };

  let dbProfile = null;
  db.write(() => {
    dbProfile = db.create('Profile', profile, true);
  });

  return dbProfile;
}

/**
 * @desc Get profile from db or from network if not exist
 * @param {string} identityKey Public key of user
 * @return {void}
 */
export function* getProfile(identityKey: string): Generator<*, *, *> {
  const db = yield defaultDB;
  let results = yield call([db, 'objects'], 'Profile');
  results = yield call([results, 'filtered'], `identityKey == '${identityKey}'`);
  const receiver = yield results[0] || null;

  if (receiver != null) {
    return yield receiver;
  }

  const profile = yield call(ChatService.getProfile, identityKey);
  const dbProfile = yield call(saveProfileIntoDatabase, profile);
  return dbProfile;
}

/**
 * @desc Starts a new chat
 * @param {StartNewChatAction} action START_NEW_CHAT action
 * @return {void}
 */
export function* startNewChatSaga(action: StartNewChatAction): Generator<*, *, *> {
  try {
    const { partnersIdentityKeys, groupChatName } = action;

    if (partnersIdentityKeys.length === 0) {
      throw new Error('Trying to create chat with zero members. It is not allowed.');
    }
    let chatId;
    if (partnersIdentityKeys.length === 1) {
      const partnerIdentityKey = partnersIdentityKeys[0];
      const { chat: { chats } } = yield select();
      const existingChat = chats.filter(chat => chat.members.length === 1 && chat.members[0] === partnerIdentityKey)[0];
      if (existingChat == null) {
        chatId = yield call(ChatService.startPrivateChat, partnerIdentityKey);
      } else {
        chatId = existingChat.id;
      }
    } else {
      chatId = yield call(ChatService.startGroupChat, partnersIdentityKeys, groupChatName);
    }
    yield put(openChat(chatId));

    yield call(action.callback, true);
  } catch (error) {
    yield call(action.callback, false);
  }
}

/**
 * @desc Load chat messages
 * @param {number} chatId Id of chat to load messages for
 * @param {string} fromMessageId Id of message to start loading from or '0'.
 * @param {number} count Count of messages to load.
 * @return {GiftedChatMessageType[]} Messages.
 */
export async function loadMessages(chatId: number, fromMessageId: string, count: number): Promise<Array<GiftedChatMessageType>> {
  const messages = await ChatService.loadMessages(chatId, fromMessageId, count);

  return messages.map(createGiftedChatMessageObject);
}

/**
 * @desc Load chat messages
 * @param {LoadChatMessagesAction} action LOAD_CHAT_MESSAGES action
 * @return {void}
 */
export function* loadMessagesActionHandler(action: LoadChatMessagesAction): Generator<*, *, *> {
  const { chatId, fromMessageId, count } = action;
  try {
    yield put(showSpinner());
    const messages = yield call(loadMessages, chatId, fromMessageId, count);
    yield put(chatMessagesLoaded(chatId, messages, count));
    if (messages.length > 0) {
      // @todo Move mark as read from there to the screen.
      yield call(panthalassaMarkMessagesAsRead, chatId);
    }
  } finally {
    yield put(hideSpinner());
  }
}

/**
 * @desc Fetch all chats
 * @return {void}
 */
export function* fetchAllChatsSaga(): Generator<*, *, *> {
  const currentAccount = yield call(getCurrentAccount);
  const chatsInfo: Array<PanthalassaChatType> = yield call(ChatService.fetchAllChats);

  const chats: Array<ChatType> = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const info of chatsInfo) {
    const {
      chat_id: chatID,
      chat_partner: singlePartner,
      group_chat_name: chatName,
      partners,
    } = info;
    const partnersIdentityKeys = partners || [Buffer.from(singlePartner, 'base64').toString('hex')];
    const profiles: Array<ProfileType> = [];
    for (let i = 0; i < partnersIdentityKeys.length; i += 1) {
      const identityKey = partnersIdentityKeys[i];
      try {
        const profile = yield call(getProfile, identityKey);
        profiles.push(profile);
      } catch (error) {
        console.log(`[CHAT] Failed to get profile for: ${identityKey}`);
      }
    }

    yield put(addPartnerProfiles(profiles));

    try {
      const firstMessages = yield call(loadMessages, chatID, '0', 1);
      chats.push({
        id: chatID,
        members: partnersIdentityKeys,
        accountId: currentAccount.id,
        unreadMessages: info.unread_messages,
        name: chatName === '' ? null : chatName,
        messages: firstMessages,
      });
    } catch (error) {
      console.log(`[CHAT] Failed to get message for chat: ${chatID}, error: ${error}`);
    }
  }

  yield put(chatsUpdated(chats));
}

/**
 * @desc Send a human message
 * @param {SendMessageAction} action SEND_MESSAGE action
 * @return {void}
 */
export function* sendMessage(action: SendMessageAction): Generator<*, *, *> {
  yield call(ChatService.sendMessage, action.chatId, action.message);
}

/**
 * @desc Handle a panthalassa persisted message
 * @param {PanthalassaMessagePersistedAction} action PANTHALASSA_MESSAGE_PERSISTED action
 * @return {void}
 */
export function* handlePanthalassaMessagePersisted(action: PanthalassaMessagePersistedAction): Generator<*, *, *> {
  const chatID = action.payload.chat;

  try {
    const { chat } = yield select();
    if (getChatById(chat, chatID) == null) {
      // @todo Handle creation of new chat.
      yield put(fetchAllChats());
      return;
    }

    const message = createGiftedChatMessageObject(action.payload);
    yield put(addChatMessage(chatID, message));
    if (action.payload.received === true) {
      yield put(unreadStatusChanged(chatID, true));
    }
  } catch (error) {
    console.log(`[TEST] Handle message persisted failed: ${error.message}`);
  }
}

/**
 * @desc Changes flag of new messages
 * @param {ChangeUnreadStatusAction} action CHANGE_UNREAD_STATUS action
 * @returns {void}
 */
export function* changeUnreadStatus(action: ChangeUnreadStatusAction): Generator<*, *, *> {
  try {
    yield call(panthalassaMarkMessagesAsRead, action.chatId);
    yield put(unreadStatusChanged(action.chatId, action.hasUnreadMessages));
  } catch (error) {
    console.log(`[CHAT] Failed to set messages as read for ${action.chatId}`);
  }
}
