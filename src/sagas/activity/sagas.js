/* eslint-disable */

import uuid from 'uuid4';
import { call, put, take } from 'redux-saga/effects';

import { doneFetchMessages, messageAdded } from '../../actions/activity';
import defaultDB from '../../services/database';
import { convertFromDatabase, convertToDatabase } from '../../utils/mapping/activity';
import type { ActivityLogMessage } from '../../types/ActivityLogMessage';
import { createDatabaseUpdateChannel } from '../database';

export function* fetchMessagesSaga(action) {
  try {
    const db = yield defaultDB;
    const messages = db.objects('MessageJob');
    yield put(doneFetchMessages(messages));
  } catch (error) {
    console.log(`Activity messages fetch failed with error: ${error.toString()}`);
  }
}

export function* watchNewMessages(): Generator<*, *, *> {
  const db = yield defaultDB;
  const results = db.objects('MessageJob');
  const channel = createDatabaseUpdateChannel(results);
  while (true) {
    const { collection } = yield take(channel);
    yield put(messageAdded(collection.map(convertFromDatabase)));
  }
}

const buildMessageObject = (highestId, message, params, interpret): ActivityLogMessage => ({
  id: highestId,
  msg: message,
  params: JSON.stringify(params),
  interpret,
  created_at: new Date()
});

export function* addNewMessageSaga(action) {
  const db = yield defaultDB;
  let params = action.params || {};
  let interpret = action.interpret === false ? false : true
  let messages = db.objects('MessageJob').sorted('id', true);
  let highestId = 1;
  if (messages.length > 0)
    highestId = messages[0].id + 1;
  const convertedMessage = convertToDatabase(buildMessageObject(highestId, action.message, params, interpret));
  if (convertedMessage === null) {
    action.callback(false);
  } else {
    db.write(() => {
      db.create('MessageJob', convertedMessage);
    });
    action.callback(true);
  }
}
