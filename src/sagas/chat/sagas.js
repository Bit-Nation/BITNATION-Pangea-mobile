// @flow

/* eslint-disable camelcase,no-continue */

import { put, call } from 'redux-saga/effects';
// $FlowFixMe Flow has issues with import buffer for some reason.
import { Buffer } from 'buffer';

import {
  SaveProfileAction,
  NewChatSessionAction,
  OpenChatAction,
  SendMessageAction,
  chatsUpdated,
  selectProfile,
  addCreatedChatSession,
  loadChatMessages,
  LoadChatMessagesAction,
  chatMessagesLoaded,
  PanthalassaMessagePersistedAction,
  addChatMessage,
} from '../../actions/chat';
import defaultDB from '../../services/database';
import ChatService from '../../services/chat';
import { getCurrentAccount, getCurrentAccountId } from '../accounts/sagas';
import { byteToHexString } from '../../utils/key';
import { createGiftedChatMessageObjects } from '../../utils/chat';

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
 * @param {string} encodedPublicKey Public key of user
 * @param {boolean} isHex If public key is in hex
 * @return {void}
 */
export function* getProfile(encodedPublicKey: string, isHex: boolean = true): Generator<*, *, *> {
  let publicKey = encodedPublicKey;
  if (isHex === true) {
    publicKey = Buffer.from(encodedPublicKey, 'hex').toString('base64');
  }
  const hexPublicKey = isHex ? encodedPublicKey : Buffer.from(encodedPublicKey, 'base64').toString('hex');

  const db = yield defaultDB;
  let results = yield call([db, 'objects'], 'Profile');
  results = yield call([results, 'filtered'], `identity_pub_key == '${publicKey}'`);
  const receiver = yield results[0] || null;

  if (receiver != null) {
    return yield receiver;
  }

  try {
    const profile = yield call(ChatService.getProfile, hexPublicKey);
    const dbProfile = yield call(saveProfileIntoDatabase, profile);
    return dbProfile;
  } catch (e) {
    return yield null;
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
 * @desc Create a chat session
 * @param {NewChatSessionAction} action NEW_CHAT_SESSION action
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
  const profile = yield call(getProfile, action.publicKey, false);
  if (profile != null) {
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
 * @return {void}
 */
export function* fetchAllChats(): Generator<*, *, *> {
  const currentAccountId = yield call(getCurrentAccountId);
  const hexPublicKeys = yield call(ChatService.fetchAllChats);

  const chats = [];
  let publicKey;
  // eslint-disable-next-line no-restricted-syntax
  for (const hexPubKey of hexPublicKeys) {
    publicKey = Buffer.from(hexPubKey, 'hex').toString('base64');
    const profile = yield call(getProfile, hexPubKey);
    if (profile != null) {
      chats.push({
        publicKey,
        username: profile.name,
        accountId: currentAccountId,
        messages: [],
      });
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
  const db = yield defaultDB;
  let results = yield call([db, 'objects'], 'Profile');
  results = yield call([results, 'filtered'], `identity_pub_key == '${action.recipientPublicKey}'`);
  const recipientProfile = yield results[0] || null;

  const senderAccount = yield call(getCurrentAccount);

  if (recipientProfile) {
    const messages = yield call(ChatService.loadMessages, senderAccount, recipientProfile, '0', 50);
    yield put(chatMessagesLoaded(action.recipientPublicKey, messages));
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
  const publicKey = Buffer.from(action.payload.chat, 'hex').toString('base64');

  const receiver = yield call(getProfile, action.payload.chat);

  const sender = yield call(getCurrentAccount);

  if (receiver) {
    const messages = createGiftedChatMessageObjects(sender, receiver, [action.payload]);
    yield put(addChatMessage(publicKey, messages[0]));
  }
}
