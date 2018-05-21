import { put, take } from 'redux-saga/effects';

import { messagesAdded, AddNewMessageAction } from '../../actions/activity';
import defaultDB from '../../services/database';
import {
  convertFromDatabase,
  convertToDatabase,
} from '../../utils/mapping/activity';
import type { ActivityLogMessage } from '../../types/ActivityLogMessage';
import { createDatabaseUpdateChannel } from '../database';


/**
 * @desc Function that listen to the new message addition event
 * @return {void}
 */
export function* watchNewMessages(): Generator<*, *, *> {
  const db = yield defaultDB;
  const results = db.objects('MessageJob');
  const channel = createDatabaseUpdateChannel(results);
  while (true) {
    const { collection } = yield take(channel);
    yield put(messagesAdded(collection.map(convertFromDatabase)));
  }
}

const buildMessageObject = (
  highestId,
  message,
  params,
  interpret,
): ActivityLogMessage => ({
  id: highestId,
  msg: message,
  params: JSON.stringify(params),
  interpret,
  created_at: new Date(),
});

/**
 * @desc Add a new activity log into the database
 * @param {AddNewMessageAction} action ADD_MESSAGE action
 * @return {void}
 */
export function* addNewMessageSaga(action: AddNewMessageAction) {
  const db = yield defaultDB;
  const params = action.params || {};
  const interpret = action.interpret !== false;
  const messages = db.objects('MessageJob').sorted('id', false);
  let highestId = 1;
  if (messages.length > 0) highestId = messages[0].id + 1;
  const convertedMessage = convertToDatabase(buildMessageObject(highestId, action.message, params, interpret));
  if (convertedMessage === null) {
    yield call(action.callback, false);
  } else {
    db.write(() => {
      db.create('MessageJob', convertedMessage);
    });
    yield call(action.callback, true);
  }
}
