import { put, call, take, fork, cancel, select } from 'redux-saga/effects';
import type { Realm } from 'realm';

import {
  SaveProfileAction, SavePreKeyBundleAction, NewChatSessionAction, OpenChatAction, SendMessageAction,
  chatsUpdated, selectProfile,
  FETCH_MESSAGES, START_FETCH_MESSAGES, STOP_FETCH_MESSAGES,
} from '../../actions/chat';
import defaultDB from '../../services/database';
import ChatService from '../../services/chat';
import type { ChatSessionType as DBChatSession } from '../../services/database/schemata';
import type { AccountType as DBAccount } from '../../services/database/schemata';
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
  yield put(chatsUpdated(collection));
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
  // const db = yield defaultDB;
  // const { profile: { information, signatures } } = action;
  // let results = yield call([db, 'objects'], 'Profile');
  // results = yield call([results, 'filtered'], `identity_pub_key == '${information.identity_pub_key}'`);
  // if (results.length === 0) {
  //   const profile = {
  //     name: information.name,
  //     location: information.location,
  //     image: information.image,
  //     identity_pub_key: information.identity_pub_key,
  //     ethereum_pub_Key: information.ethereum_pub_Key,
  //     chat_id_key: byteToHexString(information.chat_id_key),
  //     timestamp: information.timestamp,
  //     version: information.version,
  //     identity_key_signature: signatures.identity_key,
  //     ethereum_key_signature: signatures.ethereum_key,
  //   };
  //   db.write(() => {
  //     db.create('Profile', profile, true);
  //   });
  // }
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
  const results = db.objects('ChatSession').filtered(`publicKey == '${publicKey}' && accountId == '${currentAccountId}'`);
  let initMessage = null;
  if (results.length === 0) {
    try {
      const response = yield call(ChatService.getPreKeyBundle, publicKey);
      // console.log('fetch bundle: ', response);
      initMessage = yield call(ChatService.startChat, publicKey, JSON.stringify(response.bundle));
    } catch (e) {
      yield call(action.callback, {
        status: 'fail',
      });
    }
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
  }
  yield call(action.callback, {
    status: 'success',
    secret: initMessage.message.used_secret,
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
    yield call(action.callback, true);
  } else {
    yield call(action.callback, false);
  }
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @desc Fetch messages
 * @return {void}
 */
export function* tick() {
  while (true) {
    yield call(delay, 8000);
    yield put({ type: FETCH_MESSAGES });
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
    console.log('got profile: ', profile);
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
 * @param {boolean} outgoing Flag for indicating message direction
 * @return {Promise} A result promise
 */
async function handleHumanMessage(message: Object, outgoing: boolean = false): Promise {
  const db = await defaultDB;
  const results = await db.objects('ChatSession').filtered(`secret == '${message.used_secret}'`);
  if (results.length > 0) {
    const session = results[0];
    // const messageObject = await ChatService.decryptMessage(JSON.stringify(message.doubleratchet_message), secret);
    console.log('message session: ', session);
    const sharedSecrets = await db.objects('SharedSecret').filtered(`id == '${message.used_secret}'`);
    if (sharedSecrets.length > 0) {
      const sharedSecret = sharedSecrets[0];
      const newMessage = {
        type: message.type,
        send_at: message.timestamp,
        additional_data: message.additional_data,
        dapp_message: null,
        human_message: message.doubleratchet_message,
        signature: message.signature,
        used_secret: message.used_secret,
        identity_pub_key: message.id_public_key,
        shared_secret: sharedSecret,
        outgoing,
      };
      db.write(() => {
        session.messages.push(newMessage);
      });
      return true;
    }
  }
  return null;
}

export const getAccountState = state => state.accounts;

/**
 * @desc Fetch new messages
 * @return {void}
 */
export function* fetchMessages() {
  const db = yield defaultDB;
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
        console.log('handle message: ', message);
        if (message.type === 'PROTOCOL_INITIALISATION') {
          yield call(handleInitialMessage, message, currentAccount.id);
        } else {
          yield call(handleHumanMessage, message, currentAccount.id);
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
  let results = yield call([db, 'objects'], 'SharedSecret');
  results = yield call([results, 'filtered'], `id == '${action.session.secret}'`);
  const secret = yield results[0] || null;
  if (secret) {
    const messageObject = yield call(ChatService.createHumanMessage, action.message, secret.id, JSON.stringify(secret.secret), action.session.publicKey);
    yield call(action.callback, messageObject);
  } else {
    yield call(action.callback, null);
  }
}
