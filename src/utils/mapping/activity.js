// @flow

import type { ActivityLogMessage } from '../../types/ActivityLogMessage';
import { type MessageJobType as DBMessage } from '../../services/database/schemata';

/**
 * @desc Converts Realm object to app-level plain model.
 * @param {DBMessage} messageJob Realm message object.
 * @return {ActivityLogMessage} Converted message object.
 */
export function convertFromDatabase(messageJob: DBMessage): ActivityLogMessage {
  return {
    id: messageJob.id,
    accountId: messageJob.accountId,
    msg: messageJob.msg,
    params: messageJob.params,
    interpret: messageJob.interpret,
    created_at: messageJob.created_at,
  };
}

/**
 * @desc Converts message object to Realm object.
 * @param {ActivityLogMessage} messageObject Message object to be converted.
 * @return {DBMessage} Converted object.
 */
export function convertToDatabase(messageObject: ActivityLogMessage): DBMessage {
  return {
    id: messageObject.id,
    accountId: messageObject.accountId,
    heading: '',
    msg: messageObject.msg,
    params: messageObject.params || '',
    version: 1,
    display: true,
    interpret: messageObject.interpret || true,
    created_at: messageObject.created_at,
  };
}
