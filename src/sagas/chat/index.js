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

const ok = [
  {
    id: 1,
    members:
      ['SuivW2LLcnq07aThdIKPapA43fHhanDivvi3ZXgLco8=',
        '5LESXtoU0MJEu/mdXuS7qaH8GIfe9vc4Lw8quD3bNEA='],
    accountId: '247f1386-9edb-418a-ad90-d48d9e277c87',
    unreadMessages: false,
    name: 'Group chat',
    messages:
      [{
        _id: '1538169767157805594',
        text: 'Hey ho',
        createdAt: 'Sat Sep 29 2018 00:22:47 GMT+0300 (+03)',
        user: { _id: '081c3ebd1509cd4f9681757a3a241618eafa33440c160cc70057748807888916' },
        dAppMessage: null,
      }],
  },
  {
    id: 2,
    members: ['4ae8af5b62cb727ab4eda4e174828f6a9038ddf1e16a70e2bef8b765780b728f'],
    accountId: '247f1386-9edb-418a-ad90-d48d9e277c87',
    unreadMessages: false,
    name: null,
    messages:
      [{
        _id: '1538169612730164151',
        text: '',
        createdAt: 'Sat Sep 29 2018 00:20:12 GMT+0300 (+03)',
        user: { _id: '081c3ebd1509cd4f9681757a3a241618eafa33440c160cc70057748807888916' },
        dAppMessage: null,
      }],
  },
  {
    id: 3,
    members: ['e4b1125eda14d0c244bbf99d5ee4bba9a1fc1887def6f7382f0f2ab83ddb3440'],
    accountId: '247f1386-9edb-418a-ad90-d48d9e277c87',
    unreadMessages: false,
    name: null,
    messages:
      [{
        _id: '1538169612731081690',
        text: '',
        createdAt: 'Sat Sep 29 2018 00:20:12 GMT+0300 (+03)',
        user: { _id: '081c3ebd1509cd4f9681757a3a241618eafa33440c160cc70057748807888916' },
        dAppMessage: null,
      }],
  }];
