import { all, takeEvery } from 'redux-saga/effects';

import {
  START_NEW_CHAT,
  SEND_MESSAGE,
  FETCH_ALL_CHATS,
  LOAD_CHAT_MESSAGES,
  PANTHALASSA_MESSAGE_PERSISTED,
  CHANGE_UNREAD_STATUS,
} from '../../actions/chat';
import {
  startNewChatSaga,
  fetchAllChatsSaga,
  sendMessage,
  loadMessagesActionHandler,
  handlePanthalassaMessagePersisted,
  changeUnreadStatus,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_ALL_CHATS, fetchAllChatsSaga),
    takeEvery(START_NEW_CHAT, startNewChatSaga),
    takeEvery(SEND_MESSAGE, sendMessage),
    takeEvery(LOAD_CHAT_MESSAGES, loadMessagesActionHandler),
    takeEvery(PANTHALASSA_MESSAGE_PERSISTED, handlePanthalassaMessagePersisted),
    takeEvery(CHANGE_UNREAD_STATUS, changeUnreadStatus),
  ]);
}
