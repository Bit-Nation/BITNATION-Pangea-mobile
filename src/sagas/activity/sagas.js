import { call, put, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { fetchMessages, getEventEmitter, addDummyMessage, MESSAGING_QUEUE_JOB_ADDED } from './serviceFunctions';
import { doneFetchMessages, messageAdded } from '../../actions/activity';

function createMessagesQueueChannel(eventEmitter) {
  return eventChannel((emit) => {
    const handler = (data) => {
      console.log('HANDLER');
      console.log(data);
      emit(data);
    };

    console.log('EE');
    console.log(MESSAGING_QUEUE_JOB_ADDED);
    eventEmitter.on(MESSAGING_QUEUE_JOB_ADDED, handler);

    return () => eventEmitter.off(MESSAGING_QUEUE_JOB_ADDED, handler);
  });
}

export function* fetchMessagesSaga(action) {
  const messages = yield call(fetchMessages, action.limit);
  yield put(doneFetchMessages(messages));
}

export function* watchNewMessages() {
  const eventEmitter = yield call(getEventEmitter);
  const channel = yield call(createMessagesQueueChannel, eventEmitter);
  console.log('CHANNEL');
  console.log(channel);

  while (true) {
    const payload = yield take(channel);
    console.log('PAYLOAD');
    console.log(payload);
    yield put(messageAdded(payload));
  }
}

export function* addDummyMessageSaga() {
  yield addDummyMessage();
}
