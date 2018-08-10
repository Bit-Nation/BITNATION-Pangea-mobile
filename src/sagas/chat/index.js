import { all, call, takeEvery } from 'redux-saga/effects';

import {
  SAVE_PROFILE,
  SAVE_PRE_KEY_BUNDLE,
  NEW_CHAT_SESSION,
  OPEN_CHAT_SESSION,
  SEND_MESSAGE,
  FETCH_ALL_CHATS,
  START_LISTEN_FOR_MESSAGES,
  STOP_LISTEN_FOR_MESSAGES,
  LOAD_CHAT_MESSAGES,
  PANTHALASSA_MESSAGE_PERSISTED,
} from '../../actions/chat';
import {
  saveProfileSaga,
  savePreKeyBundle,
  createChatSession,
  openChatSession,
  fetchAllChats,
  startListenForMessages,
  stopListenForMessages,
  sendMessage,
  loadMessages,
  handlePanthalassaMessagePersisted,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_ALL_CHATS, fetchAllChats),
    takeEvery(START_LISTEN_FOR_MESSAGES, startListenForMessages),
    takeEvery(STOP_LISTEN_FOR_MESSAGES, stopListenForMessages),
    takeEvery(SAVE_PROFILE, saveProfileSaga),
    takeEvery(SAVE_PRE_KEY_BUNDLE, savePreKeyBundle),
    takeEvery(NEW_CHAT_SESSION, createChatSession),
    takeEvery(OPEN_CHAT_SESSION, openChatSession),
    takeEvery(SEND_MESSAGE, sendMessage),
    takeEvery(LOAD_CHAT_MESSAGES, loadMessages),
    takeEvery(PANTHALASSA_MESSAGE_PERSISTED, handlePanthalassaMessagePersisted),
  ]);
}
