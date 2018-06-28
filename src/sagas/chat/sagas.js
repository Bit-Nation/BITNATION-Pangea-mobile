import { put, call, take, fork, cancel, select } from 'redux-saga/effects';
import type { Realm } from 'realm';

import {
  SaveProfileAction, SavePreKeyBundleAction, NewChatSessionAction, OpenChatAction, chatsUpdated, selectProfile,
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
export function* onCurrentAccountChange(collection: Realm.Result<ChatSessionType>): Generator<*, *, *> {
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
 * @desc Save a user profile into the database
 * @param {SaveProfileAction} action SAVE_PROFILE action
 * @return {void}
 */
export function* saveProfile(action: SaveProfileAction) {
  const db = yield defaultDB;
  const { profile: { information, signatures } } = action;
  // const results = db.objects('Profile').filtered(`identity_pub_key == '${information.identity_pub_key}'`);
  let results = yield call([db, 'objects'], 'Profile');
  results = yield call([results, 'filtered'], `identity_pub_key == '${information.identity_pub_key}'`);
  if (results.length === 0) {
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
      db.create('Profile', profile);
    });
  }
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
    const messages = response.messages;
    console.log('got messages: ', messages);
    if (messages) {
      messages.forEach((m) => {
        const message = JSON.parse(m);
        if (message.type === 'PROTOCOL_INITIALISATION') {

        }
      });
    }
  } catch (e) {
    console.log('fetch message error: ', e);
  }
}