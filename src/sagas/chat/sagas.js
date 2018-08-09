// @flow

/* eslint-disable camelcase,no-continue */

import { delay } from 'redux-saga';
import { put, call, take, fork, cancel } from 'redux-saga/effects';
import type { Realm } from 'realm';

import {
  SaveProfileAction,
  SavePreKeyBundleAction,
  NewChatSessionAction,
  OpenChatAction,
  SendMessageAction,
  FetchAllChatsAction,
  StartListenForMessagesAction,
  StopListenForMessagesAction,
  chatsUpdated,
  selectProfile,
  addCreatedChatSession,
  loadChatMessages,
  LoadChatMessagesAction,
  chatMessagesLoaded,
} from '../../actions/chat';
import defaultDB from '../../services/database';
import ChatService from '../../services/chat';
import type { ChatSessionType as DBChatSession } from '../../services/database/schemata';
import { getCurrentAccount, getCurrentAccountId, currentAccountBasedUpdate } from '../accounts/sagas';
import { byteToHexString } from '../../utils/key';
import type { DAppMessageType } from '../../services/database/schema/v4';

/**
 * @desc Function that creates Realm results fetching chats for specific account.
 * @param {Realm} db Realm instance.
 * @param {string|null} accountId Id of account to fetch logs or null.
 * @return {Realm.Results<AccountSettings>|null} Realm results fetching logs for specified account or null if not applicable.
 */
export function buildChatResults(db: Realm, accountId: string | null) {
  if (accountId === null) {
    return null;
  }
  return db.objects('ChatSession').filtered(`accountId == '${accountId}'`);
}

/**
 * @desc Extracts DApp information from message if possible.
 * @param {string} decrypted Plain message text.
 * @return {?DAppMessageType} Message object or undefined.
 */
function extractDAppMessage(decrypted: string): ?DAppMessageType {
  try {
    const parsed = JSON.parse(decrypted);
    if (parsed == null) return undefined;
    if (parsed.dapp_id == null || typeof parsed.dapp_id !== 'string') return undefined;
    if (parsed.type == null || typeof parsed.type !== 'string') return undefined;
    if (parsed.group_id == null || typeof parsed.group_id !== 'string') return undefined;
    if (parsed.params == null || typeof parsed.params !== 'string') return undefined;

    return {
      dapp_id: parsed.dapp_id,
      type: parsed.type,
      group_id: parsed.dapp_id,
      params: parsed.params,
      should_send: true,
      should_render: true,
    };
  } catch (e) {
    return undefined;
  }
}

/**
 * @desc Save profile into database.
 * @param {Object} profileObject Profile object
 * @return {void}
 */
async function saveProfileIntoDatabase(profileObject: Object) {
  const db = await defaultDB;
  const isProfileOnDb = db.objects('Profile').filtered(`identity_pub_key == '${profileObject.ethereumPubKey}'`);
  if (isProfileOnDb.length === 0) {
    const profile = {
      name: profileObject.name,
      location: profileObject.location || '',
      image: profileObject.image || '',
      identity_pub_key: profileObject.identityPubKey,
      ethereum_pub_Key: profileObject.ethereumPubKey,
      chat_id_key: byteToHexString(profileObject.chatIdentityPubKey),
      timestamp: new Date(1000 * profileObject.timestamp),
      version: profileObject.version,
      identity_key_signature: profileObject.identityKeySignature,
      ethereum_key_signature: profileObject.ethereumKeySignature,
    };
    
    db.write(() => {
      db.create('Profile', profile, true);
    });
  }
}

/**
 * @desc Save a user profile into the database
 * @param {SaveProfileAction} action SAVE_PROFILE action
 * @return {void}
 */
export function* saveProfileSaga(action: SaveProfileAction): Generator<*, *, *> {
  yield call(saveProfileIntoDatabase, action.profile);
}

/**
 * @desc Save a user profile into the database
 * @param {SaveProfileAction} action SAVE_PROFILE action
 * @return {void}
 */
export function* savePreKeyBundle(action: SavePreKeyBundleAction): Generator<*, *, *> {
  const db = yield defaultDB;
  const dbObject = {
    one_time_pre_key: byteToHexString(action.preKeyBundle.public_part.one_time_pre_key),
    private_part: action.preKeyBundle.private_part,
  };
  db.write(() => {
    db.create('PreKeyBundle', dbObject);
  });
}

/**
 * @desc Create a chat session
 * @param {NewChatSessionAction} action SAVE_PROFILE action
 * @return {void}
 */
export function* createChatSession(action: NewChatSessionAction): Generator<*, *, *> {
  const currentAccountId = yield call(getCurrentAccountId);
  const chatSession = {
    publicKey: action.profile.identityPubKey,
    username: action.profile.name,
    accountId: currentAccountId,
    messages: [],
  };
  yield put(addCreatedChatSession(chatSession));

  const userPublicKey = yield call(ChatService.getPublicKey);
  yield call(action.callback, {
    status: 'success',
    userPublicKey,
  });
  yield put(selectProfile(action.profile));
}

/**
 * @desc Open a chat session
 * @param {OpenChatAction} action OPEN_CHAT_SESSION action
 * @return {void}
 */
export function* openChatSession(action: OpenChatAction): Generator<*, *, *> {
  const db = yield defaultDB;
  let results = yield call([db, 'objects'], 'Profile');
  results = yield call([results, 'filtered'], `identity_pub_key == '${action.publicKey}'`);
  const profile = yield results[0] || null;
  if (profile) {
    yield put(loadChatMessages(action.publicKey));
    yield put(selectProfile(profile));
    const userPublicKey = yield call(ChatService.getPublicKey);
    yield call(action.callback, {
      status: 'success',
      userPublicKey,
    });
  } else {
    yield call(action.callback, {
      status: 'fail',
    });
  }
}

/**
 * @desc Fetch all chats
 * @param {FetchAllChatsAction} action FETCH_ALL_CHATS action
 * @return {void}
 */
export function* fetchAllChats(): Generator<*, *, *> {
  const chats = yield call(ChatService.fetchAllChats);
  yield put(chatsUpdated(chats));
}

/**
 * @desc Start listening for incoming messages
 * @param {StartListenForMessagesAction} action START_LISTEN_FOR_MESSAGES action
 * @return {void}
 */
export function* startListenForMessages(): Generator<*, *, *> {
  // TOOD: Create panthalassa listener and set in state
}

/**
 * @desc Stop listening for incoming messages
 * @param {StopListenForMessagesAction} action STOP_LISTEN_FOR_MESSAGES action
 * @return {void}
 */
export function* stopListenForMessages(): Generator<*, *, *> {
  // TOOD: Stop panthalassa listener and remove from state
}

/**
 * @desc Load chat messages
 * @param {LoadChatMessagesAction} action LOAD_CHAT_MESSAGES action
 * @return {void}
 */
export function* loadMessages(action: LoadChatMessagesAction): Generator<*, *, *> {
  const messages = yield call(ChatService.loadMessages, action.recipientPublicKey, 0, 10);
  yield put(chatMessagesLoaded(action.recipientPublicKey, messages));
}

/**
 * @desc Handle chat init handshake
 * @param {Object} message Initialization message object
 * @param {string} accountId Current account Id
 * @return {Promise} A result promise
 */
async function handleInitialMessage(message: Object, accountId: string): Promise<boolean> {
  const db = await defaultDB;
  const results = await db.objects('PreKeyBundle').filtered(`one_time_pre_key == '${message.additional_data.used_one_time_pre_key}'`);
  if (results.length > 0) {
    const preKeyBundle = results[0];
    const response = await ChatService.handleChatInit(JSON.stringify(message), JSON.stringify(preKeyBundle.private_part));
    console.log('handle init chat: ', response);
    const secret = JSON.parse(response);
    const profile = await ChatService.getProfile(message.id_public_key);
    await saveProfileIntoDatabase(profile);

    const sharedSecret = {
      id: message.used_secret,
      publicKey: message.id_public_key,
      secret,
      accountId,
    };
    const chatSession = {
      secret: message.used_secret,
      publicKey: message.id_public_key,
      username: profile.name,
      accountId,
      messages: [],
    };
    db.write(() => {
      db.create('SharedSecret', sharedSecret, true);
      db.create('ChatSession', chatSession, true);
    });
  } else {
    return false;
  }

  return true;
}

/**
 * @desc Handle human message
 * @param {Object} message Human message object
 * @return {Promise} A result promise
 */
async function handleHumanMessage(message: Object): Promise<boolean> {
  console.log('handle message: ', message);
  const db = await defaultDB;
  const results = await db.objects('ChatSession').filtered(`secret == '${message.used_secret}'`);
  if (results.length === 0) return false;

  const session = results[0];
  const newMessage = {
    type: message.type,
    timestamp: message.timestamp,
    used_secret: message.used_secret,
    additional_data: JSON.stringify(message.additional_data || {}),
    doubleratchet_message: JSON.stringify(message.doubleratchet_message),
    signature: message.signature,
    id_public_key: message.id_public_key,
    receiver: message.receiver,
  };
  try {
    db.write(() => {
      const dbMessage = db.create('Message', newMessage, true);
      session.messages.push(dbMessage);
    });
  } catch (e) {
    console.log('session db update error: ', e);
    return false;
  }
  return true;
}

/**
 * @desc Send a human message
 * @param {SendMessageAction} action SEND_MESSAGE action
 * @return {void}
 */
export function* sendMessage(action: SendMessageAction): Generator<*, *, *> {
  const db = yield defaultDB;
  try {
    let results = yield call([db, 'objects'], 'SharedSecret');
    results = yield call([results, 'filtered'], `id == '${action.session.secret}'`);
    const secret = yield results[0] || null;
    if (secret) {
      const messageObject = yield call(ChatService.createHumanMessage, action.message, secret.id, JSON.stringify(secret.secret), action.session.publicKey);
      yield call(handleHumanMessage, messageObject);
      yield call(action.callback, messageObject);
    } else {
      yield call(action.callback, null);
    }
  } catch (e) {
    console.log('send message error: ', e);
    yield call(action.callback, null);
  }
}
