import { all, call, takeEvery } from 'redux-saga/effects';

import { SAVE_PROFILE, SAVE_PRE_KEY_BUNDLE, NEW_CHAT_SESSION, OPEN_CHAT_SESSION, FETCH_MESSAGES } from '../../actions/chat';
import {
  startDatabaseListening,
  saveProfileSaga,
  savePreKeyBundle,
  createChatSession,
  openChatSession,
  listenMessages,
  fetchMessages,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(startDatabaseListening),
    call(listenMessages),
    takeEvery(SAVE_PROFILE, saveProfileSaga),
    takeEvery(SAVE_PRE_KEY_BUNDLE, savePreKeyBundle),
    takeEvery(NEW_CHAT_SESSION, createChatSession),
    takeEvery(OPEN_CHAT_SESSION, openChatSession),
    takeEvery(FETCH_MESSAGES, fetchMessages),
  ]);
}
