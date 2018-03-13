import { call, put, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { fetchMessages, getEventEmitter, addDummyMessage, MESSAGING_QUEUE_JOB_ADDED } from './serviceFunctions';
import { doneFetchMessages, messageAdded } from '../../actions/activity';
import { syncNations } from '../nations';

function createMessagesQueueChannel(eventEmitter) {
  return eventChannel((emit) => {
    const handler = (data) => {
      emit(data);
    };

    eventEmitter.on(MESSAGING_QUEUE_JOB_ADDED, handler);

    return () => eventEmitter.off(MESSAGING_QUEUE_JOB_ADDED, handler);
  });
}

export function* fetchMessagesSaga(action) {
  try {
    const messages = yield call(fetchMessages, action.limit);
    yield put(doneFetchMessages(messages));
  } catch (error) {
    console.log(`Activity messages fetch failed with error: ${error.toString()}`);
  }
}

export function* watchNewMessages() {
  const eventEmitter = yield call(getEventEmitter);
  const channel = yield call(createMessagesQueueChannel, eventEmitter);

  while (true) {
    const payload = yield take(channel);
    yield put(messageAdded(payload));
    yield fork(syncNations);
  }
}

export function* addDummyMessageSaga() {
  yield addDummyMessage();
}
