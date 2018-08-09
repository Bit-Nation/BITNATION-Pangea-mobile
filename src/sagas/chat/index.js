import { all, call, takeEvery } from 'redux-saga/effects';

import {
  SAVE_PROFILE,
  SAVE_PRE_KEY_BUNDLE,
  NEW_CHAT_SESSION,
  OPEN_CHAT_SESSION,
  SEND_MESSAGE,
  START_LISTEN_FOR_MESSAGES,
  STOP_LISTEN_FOR_MESSAGES,
} from '../../actions/chat';
import {
  startDatabaseListening,
  saveProfileSaga,
  savePreKeyBundle,
  createChatSession,
  openChatSession,
  fetchAllMessages,
  startListenForMessages,
  stopListenForMessages,
  sendMessage,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(startDatabaseListening),
    call(fetchAllMessages),
    takeEvery(START_LISTEN_FOR_MESSAGES, startListenForMessages),
    takeEvery(STOP_LISTEN_FOR_MESSAGES, stopListenForMessages),
    takeEvery(SAVE_PROFILE, saveProfileSaga),
    takeEvery(SAVE_PRE_KEY_BUNDLE, savePreKeyBundle),
    takeEvery(NEW_CHAT_SESSION, createChatSession),
    takeEvery(OPEN_CHAT_SESSION, openChatSession),
    takeEvery(SEND_MESSAGE, sendMessage),
  ]);
}
