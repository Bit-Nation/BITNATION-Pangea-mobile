import { put, call, take, fork, cancel } from 'redux-saga/effects';
import type { Realm } from 'realm';

import { SaveProfileAction, SavePreKeyBundleAction, NewChatSessionAction, OpenChatAction, ChatListenAction, chatsUpdated, selectProfile, FETCH_MESSAGES } from '../../actions/chat';
import defaultDB from '../../services/database';
import ChatService from '../../services/chat';
import type { ChatSessionType as DBChatSession } from '../../services/database/schemata';
import { getCurrentAccountId, currentAccountBasedUpdate } from '../accounts/sagas';
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
  const { profile: { information } } = action;
  const profile = {
    name: information.name,
    location: information.location,
    image: information.image,
    identity_pub_key: information.identity_pub_key,
    ethereum_pub_Key: information.ethereum_pub_Key,
    chat_id_key: information.chat_id_key,
    timestamp: information.timestamp,
    version: information.version,
    identity_key_signature: information.identity_key_signature,
    ethereum_key_signature: information.ethereum_key_signature,
  };
  db.write(() => {
    db.create('Profile', profile);
  });
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
  const secret = {
    id: action.profile.information.identity_pub_key,
    secret: action.initMessage.shared_chat_secret,
    accountId: currentAccountId,
  };
  const chatSession = {
    publicKey: action.profile.information.identity_pub_key,
    username: action.profile.information.name,
    accountId: currentAccountId,
    messages: [],
  };
  yield put(selectProfile(action.profile));
  db.write(() => {
    db.create('SharedSecret', secret);
    db.create('ChatSession', chatSession);
  });
  yield call(action.callback, true);
}

/**
 * @desc Open a chat session
 * @param {OpenChatAction} action OPEN_CHAT_SESSION action
 * @return {void}
 */
export function* openChatSession(action: OpenChatAction) {
  const db = yield defaultDB;
  const currentAccountId = yield call(getCurrentAccountId);
  let results = yield call([db, 'objects'], 'ChatSession');
  results = yield call([results, 'filtered'], `publicKey == '${action.publicKey}' && accountId == '${currentAccountId}'`);
  const profile = yield results[0] || null;
  if (profile) {
    yield put(selectProfile(action.profile));
    yield call(action.callback, true);
  } else {
    yield call(action.callback, false);
  }
}

/**
 * @desc Fetch messages
 * @return {void}
 */
function* tick() {
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
export function* listenMessages(action: ChatListenAction) {
  const bgSyncTask = yield fork(tick);
  yield take('STOP_FETCH_MESSAGES');
  yield cancel(bgSyncTask);
}

/**
 * @desc Fetch new messages
 * @return {void}
 */
export function* fetchMessages() {
  const db = yield defaultDB;
}
