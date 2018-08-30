// @flow

import { put, call, select } from 'redux-saga/effects';
import { Buffer } from 'buffer/index';

import type {
  GetProfileAction,
  NewChatSessionAction,
  OpenChatAction,
  SendMessageAction,
  LoadChatMessagesAction,
  PanthalassaMessagePersistedAction,
} from '../../actions/chat';
import {
  chatsUpdated,
  selectProfile,
  addCreatedChatSession,
  chatMessagesLoaded,
  addChatMessage, newChatSession, showSpinner, hideSpinner,
} from '../../actions/chat';
import defaultDB from '../../services/database';
import ChatService from '../../services/chat';
import { getCurrentAccount, getCurrentAccountId } from '../accounts/sagas';
import { createGiftedChatMessageObjects } from '../../utils/chat';
import { panthalassaEthPubToAddress } from '../../services/panthalassa';
import { CHAT_MESSAGES_PAGE } from '../../global/Constants';

/**
 * @desc Save profile into database.
 * @param {Object} profileObject Profile object
 * @return {void}
 */
async function saveProfileIntoDatabase(profileObject: Object) {
  const db = await defaultDB;
  const isProfileOnDb = db.objects('Profile').filtered(`identityKey == '${profileObject.ethereumPubKey}'`);
  if (isProfileOnDb.length === 0) {
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

  return isProfileOnDb[0];
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
 * @desc Handler for GET_PROFILE action.
 * @param {GetProfileAction} action An action.
 * @return {void}
 */
export function* getProfileActionHandler(action: GetProfileAction): Generator<*, *, *> {
  try {
    const profile = yield call(getProfile, action.identityKey);
    return yield call(action.callback, profile, null);
  } catch (error) {
    return yield call(action.callback, null, error);
  }
}

/**
 * @desc Create a chat session
 * @param {NewChatSessionAction} action NEW_CHAT_SESSION action
 * @return {void}
 */
export function* createChatSession(action: NewChatSessionAction): Generator<*, *, *> {
  const currentAccountId = yield call(getCurrentAccountId);
  const chatSession = {
    publicKey: action.profile.identityKey,
    profile: action.profile,
    accountId: currentAccountId,
    messages: [],
  };
  yield put(addCreatedChatSession(chatSession));

  yield put(selectProfile(action.profile));

  const userPublicKey = yield call(ChatService.getPublicKey);
  yield call(action.callback, {
    status: 'success',
    userPublicKey,
  });
}

/**
 * @desc Open a chat session
 * @param {OpenChatAction} action OPEN_CHAT_SESSION action
 * @return {void}
 */
export function* openChatSession(action: OpenChatAction): Generator<*, *, *> {
  try {
    const profile = yield call(getProfile, action.publicKey, false);
    if (profile == null) {
      yield call(action.callback, {
        status: 'fail',
      });
      return;
    }

    yield put(selectProfile(profile));
    const userPublicKey = yield call(ChatService.getPublicKey);
    yield call(action.callback, {
      status: 'success',
      userPublicKey,
    });
  } catch (error) {
    yield call(action.callback, {
      status: 'fail',
    });
  }
}

/**
 * @desc Fetch all chats
 * @return {void}
 */
export function* fetchAllChats(): Generator<*, *, *> {
  const currentAccount = yield call(getCurrentAccount);
  const { id: currentAccountId } = currentAccount;
  const identityKeys = yield call(ChatService.fetchAllChats);

  const chats = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const identityKey of identityKeys) {
    try {
      const profile = yield call(getProfile, identityKey);
      const firstMessages = yield call(ChatService.loadMessages, currentAccount, profile, '0', 1);
      if (profile != null) {
        chats.push({
          publicKey: identityKey,
          profile,
          accountId: currentAccountId,
          messages: firstMessages,
        });
      }
    } catch (error) {
      console.log(`[TEST] Fail to get profile with error: ${error.message}`);
    }
  }

  yield put(chatsUpdated(chats));
}

/**
 * @desc Load chat messages
 * @param {LoadChatMessagesAction} action LOAD_CHAT_MESSAGES action
 * @return {void}
 */
export function* loadMessages(action: LoadChatMessagesAction): Generator<*, *, *> {
  const { recipientPublicKey, fromMessageId } = action;
  const db = yield defaultDB;
  let results = yield call([db, 'objects'], 'Profile');
  results = yield call([results, 'filtered'], `identityKey == '${recipientPublicKey}'`);
  const recipientProfile = yield results[0] || null;

  const senderAccount = yield call(getCurrentAccount);

  if (recipientProfile != null) {
    try {
      yield put(showSpinner());
      const messages = yield call(ChatService.loadMessages, senderAccount, recipientProfile, fromMessageId, CHAT_MESSAGES_PAGE);
      yield put(chatMessagesLoaded(recipientPublicKey, messages, CHAT_MESSAGES_PAGE));
    } finally {
      yield put(hideSpinner());
    }
  }
}

/**
 * @desc Send a human message
 * @param {SendMessageAction} action SEND_MESSAGE action
 * @return {void}
 */
export function* sendMessage(action: SendMessageAction): Generator<*, *, *> {
  yield call(ChatService.sendMessage, action.recipientPublicKey, action.message);
}

/**
 * @desc Handle a panthalassa persisted message
 * @param {PanthalassaMessagePersistedAction} action PANTHALASSA_MESSAGE_PERSISTED action
 * @return {void}
 */
export function* handlePanthalassaMessagePersisted(action: PanthalassaMessagePersistedAction): Generator<*, *, *> {
  const publicKey = action.payload.chat;

  try {
    const receiver = yield call(getProfile, publicKey);

    const sender = yield call(getCurrentAccount);

    const { chat: { chats } } = yield select();
    if (chats.findIndex(chat => chat.publicKey === publicKey) === -1) {
      yield call(createChatSession, newChatSession(receiver, () => undefined));
    }

    if (receiver) {
      const messages = createGiftedChatMessageObjects(sender, receiver, [action.payload]);
      yield put(addChatMessage(publicKey, messages[0]));
    }
  } catch (error) {
    console.log(`[TEST] Handle message persisted failed: ${error.message}`);
  }
}
