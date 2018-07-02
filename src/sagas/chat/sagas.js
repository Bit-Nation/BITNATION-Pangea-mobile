/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import { delay } from 'redux-saga';
import { put, call, take, fork, cancel, select } from 'redux-saga/effects';
import type { Realm } from 'realm';

import {
  SaveProfileAction, SavePreKeyBundleAction, NewChatSessionAction, OpenChatAction, SendMessageAction, SaveHumanMessageAction,
  chatsUpdated, selectProfile,
  FETCH_MESSAGES, START_FETCH_MESSAGES, STOP_FETCH_MESSAGES,
} from '../../actions/chat';
import defaultDB from '../../services/database';
import ChatService from '../../services/chat';
import type { ChatSessionType as DBChatSession } from '../../services/database/schemata';
// import type { AccountType as DBAccount } from '../../services/database/schemata';
import { getCurrentAccountId, currentAccountBasedUpdate } from '../accounts/sagas';
import { getCurrentAccount } from '../../reducers/accounts';
import { byteToHexString } from '../../utils/key';

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
 * @desc Generator to be called on database change. Used to update chat list.
 * @param {*} collection Updated chat collection
 * @return {void}
 */
export function* onCurrentAccountChange(collection: Realm.Result<DBChatSession>): Generator<*, *, *> {
  const db = yield defaultDB;

  // get current user
  const { accounts } = yield select();
  const currentAccount = getCurrentAccount(accounts);

  const updatedSessions = [];
  try {
    for (let i = 0; i < collection.length; i++) {
      const session = collection[i];
      session.decryptedMessages = [];

      // get shared secret from db
      let sharedSecrets = yield call([db, 'objects'], 'SharedSecret');
      sharedSecrets = yield call([sharedSecrets, 'filtered'], `id == '${session.secret}'`);
      if (sharedSecrets.length === 0) {
        return yield null;
      }
      const sharedSecret = sharedSecrets[0].secret;
      console.log('decrypt using secret: ', sharedSecret);

      // get opponent user object
      let results = yield call([db, 'objects'], 'Profile');
      results = yield call([results, 'filtered'], `identity_pub_key == '${session.publicKey}'`);
      if (results.length === 0) {
        return yield null;
      }
      const profile = results[0];

      for (let j = 0; j < session.messages.length; j++) {
        let additional_data = JSON.parse(session.messages[j].additional_data);
        if (typeof additional_data !== 'object') {
          additional_data = {};
        }
        let doubleratchet_message = JSON.parse(session.messages[j].doubleratchet_message);
        if (typeof doubleratchet_message !== 'object') {
          doubleratchet_message = {};
        }
        const message = {
          ...session.messages[j],
          doubleratchet_message,
          additional_data,
        };
        console.log('decrypting message: ', message);
        const decrypted = yield call(ChatService.decryptMessage, JSON.stringify(message), JSON.stringify(sharedSecret));
        console.log('decrypted message: ', decrypted);
        const messageObject = {
          _id: j,
          text: decrypted,
          createdAt: message.timestamp,
          user: {
            _id: message.id_public_key,
            name: session.publicKey === message.id_public_key ? profile.name : currentAccount.name,
          },
        };
        session.decryptedMessages.push(messageObject);
      }
      updatedSessions.push(session);
    }
  } catch (e) {
    console.log('message convert error: ', e);
  }
  yield put(chatsUpdated(updatedSessions));
}

/**
 * @desc Start listen to chat updates in database.
 * @return {void}
 */
export function* startDatabaseListening(): Generator<*, *, *> {
  yield call(currentAccountBasedUpdate, buildChatResults, onCurrentAccountChange);
}

/**
 * @desc Save profile into database.
 * @param {Object} profileObject Profile object
 * @return {void}
 */
async function saveProfileIntoDatabase(profileObject: Object) {
  const db = await defaultDB;
  const { information, signatures } = profileObject;
  const profile = {
    name: information.name,
    location: information.location,
    image: information.image,
    identity_pub_key: information.identity_pub_key,
    ethereum_pub_Key: information.ethereum_pub_Key,
    chat_id_key: byteToHexString(information.chat_id_key),
    timestamp: information.timestamp,
    version: information.version,
    identity_key_signature: signatures.identity_key,
    ethereum_key_signature: signatures.ethereum_key,
  };
  db.write(() => {
    db.create('Profile', profile, true);
  });
}

/**
 * @desc Save a user profile into the database
 * @param {SaveProfileAction} action SAVE_PROFILE action
 * @return {void}
 */
export function* saveProfileSaga(action: SaveProfileAction) {
  yield call(saveProfileIntoDatabase, action.profile);
}

/**
 * @desc Save a user profile into the database
 * @param {SaveProfileAction} action SAVE_PROFILE action
 * @return {void}
 */
export function* savePreKeyBundle(action: SavePreKeyBundleAction) {
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
export function* createChatSession(action: NewChatSessionAction) {
  const db = yield defaultDB;
  const currentAccountId = yield call(getCurrentAccountId);
  const publicKey = action.profile.information.identity_pub_key;
  let results = yield call([db, 'objects'], 'ChatSession');
  results = yield call([results, 'filtered'], `publicKey == '${publicKey}' && accountId == '${currentAccountId}'`);
  let usedSecret = null;
  if (results.length === 0) {
    let initMessage = null;
    try {
      const response = yield call(ChatService.getPreKeyBundle, publicKey);
      console.log('fetch bundle: ', response);
      initMessage = yield call(ChatService.startChat, publicKey, JSON.stringify(response.bundle));
      console.log('initialization: ', initMessage);
    } catch (e) {
      yield call(action.callback, {
        status: 'fail',
      });
    }
    usedSecret = initMessage.message.used_secret;
    const secret = {
      id: initMessage.message.used_secret,
      publicKey,
      secret: initMessage.shared_chat_secret,
      accountId: currentAccountId,
    };
    const chatSession = {
      secret: initMessage.message.used_secret,
      publicKey,
      username: action.profile.information.name,
      accountId: currentAccountId,
      messages: [],
    };
    db.write(() => {
      db.create('SharedSecret', secret, true);
      db.create('ChatSession', chatSession, true);
    });
  } else {
    usedSecret = results[0].secret;
  }
  const userPublicKey = yield call(ChatService.getPublicKey);
  yield call(action.callback, {
    status: 'success',
    secret: usedSecret,
    userPublicKey,
  });
  yield put(selectProfile(action.profile));
}

/**
 * @desc Open a chat session
 * @param {OpenChatAction} action OPEN_CHAT_SESSION action
 * @return {void}
 */
export function* openChatSession(action: OpenChatAction) {
  const db = yield defaultDB;
  let results = yield call([db, 'objects'], 'Profile');
  results = yield call([results, 'filtered'], `identity_pub_key == '${action.publicKey}'`);
  const profile = yield results[0] || null;
  if (profile) {
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
 * @desc Fetch messages
 * @return {void}
 */
export function* tick() {
  while (true) {
    yield put({ type: FETCH_MESSAGES });
    yield delay(8000);
  }
}

/**
 * @desc Start listening to incoming messages
 * @param {ChatListenAction} action LISTEN_CHAT action
 * @return {void}
 */
export function* listenMessages() {
  while (yield take(START_FETCH_MESSAGES)) {
    // starts the task in the background
    const bgSyncTask = yield fork(tick);

    // wait for the user stop action
    yield take(STOP_FETCH_MESSAGES);
    // user clicked stop. cancel the background task
    // this will throw a SagaCancellationException into task
    yield cancel(bgSyncTask);
  }
}

/**
 * @desc Handle chat init handshake
 * @param {Object} message Initialization message object
 * @param {string} accountId Current account Id
 * @return {Promise} A result promise
 */
async function handleInitialMessage(message: Object, accountId: string): Promise {
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
      username: profile.information.name,
      accountId,
      messages: [],
    };
    db.write(() => {
      db.create('SharedSecret', sharedSecret, true);
      db.create('ChatSession', chatSession, true);
    });
  } else {
    return null;
  }

  return true;
}

/**
 * @desc Handle human message
 * @param {Object} message Human message object
 * @return {Promise} A result promise
 */
async function handleHumanMessage(message: Object): Promise {
  console.log('handle message: ', message);
  const db = await defaultDB;
  const results = await db.objects('ChatSession').filtered(`secret == '${message.used_secret}'`);
  if (results.length > 0) {
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
    const messages = session.messages.slice();
    messages.push(newMessage);
    console.log('updated messages: ', messages);
    try {
      db.write(() => {
        session.messages = messages;
      });
    } catch (e) {
      console.log('session db update error: ', e);
    }
    return true;
  }
  return null;
}

export const getAccountState = state => state.accounts;

/**
 * @desc Fetch new messages
 * @return {void}
 */
export function* fetchMessages() {
  try {
    const { accounts } = yield select();
    const currentAccount = getCurrentAccount(accounts);
    if (currentAccount === null) {
      return yield null;
    }
    const publicKey = yield call(ChatService.getPublicKey);
    const response = yield call(ChatService.loadMessages, publicKey);
    const { messages } = response;
    if (messages) {
      for (let i = 0; i < messages.length; i++) {
        const message = JSON.parse(messages[i]);
        if (message.type === 'PROTOCOL_INITIALISATION') {
          yield call(handleInitialMessage, message, currentAccount.id);
        } else if (message.type === 'HUMAN_MESSAGE') {
          yield call(handleHumanMessage, message);
        }
      }
    }
  } catch (e) {
    console.log('fetch message error: ', e);
  }
}

/**
 * @desc Send a human message
 * @param {SendMessageAction} action SEND_MESSAGE action
 * @return {void}
 */
export function* sendMessage(action: SendMessageAction) {
  const db = yield defaultDB;
  try {
    let results = yield call([db, 'objects'], 'SharedSecret');
    results = yield call([results, 'filtered'], `id == '${action.session.secret}'`);
    const secret = yield results[0] || null;
    if (secret) {
      const messageObject = yield call(ChatService.createHumanMessage, action.message, secret.id, JSON.stringify(secret.secret), action.session.publicKey);
      yield call(action.callback, messageObject);
    } else {
      yield call(action.callback, null);
    }
  } catch (e) {
    console.log('send message error: ', e);
  }
}

/**
 * @desc Save a human message
 * @param {SaveHumanMessageAction} action SAVE_HUMAN_MESSAGE action
 * @return {void}
 */
export function* saveHumanMessage(action: SaveHumanMessageAction) {
  yield call(handleHumanMessage, action.message);
}
