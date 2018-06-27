import { all, call, takeEvery } from 'redux-saga/effects';

import { SAVE_PROFILE, SAVE_PRE_KEY_BUNDLE, NEW_CHAT_SESSION, OPEN_CHAT_SESSION } from '../../actions/chat';
import {
  startDatabaseListening,
  saveProfile,
  savePreKeyBundle,
  createChatSession,
  openChatSession,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(startDatabaseListening),
    takeEvery(SAVE_PROFILE, saveProfile),
    takeEvery(SAVE_PRE_KEY_BUNDLE, savePreKeyBundle),
    takeEvery(NEW_CHAT_SESSION, createChatSession),
    takeEvery(OPEN_CHAT_SESSION, openChatSession),
  ]);
}
