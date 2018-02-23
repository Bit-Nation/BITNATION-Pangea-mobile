// @flow

import { ACTIVITY_MESSAGES_LIMIT } from '../global/Constants';
import { type ActivityLogMessage } from '../types/ActivityLogMessage';

export const MESSAGE_ADDED = 'MESSAGE_ADDED';
export const START_FETCH_MESSAGES = 'START_FETCH_MESSAGES';
export const DONE_FETCH_MESSAGES = 'DONE_FETCH_MESSAGES';
export const ADD_DUMMY_MESSAGE = 'ADD_DUMMY_MESSAGE';

/**
 * @desc Action creator for an action that should be called once new activity log message added.
 * @param {ActivityLogMessage} message Activity log message that is added.
 * @returns {{type: string, message: *}} An action.
 */
export function messageAdded(message: ActivityLogMessage) {
  return {
    type: MESSAGE_ADDED,
    message,
  };
}

/**
 * @desc Action creator for an action that starts fetching of activity log messages.
 * @param {number} limit Limit of count of messages to fetch.
 * @returns {{type: string, limit: number}} An action.
 */
export function startFetchMessages(limit: number = ACTIVITY_MESSAGES_LIMIT) {
  return {
    type: START_FETCH_MESSAGES,
    limit,
  };
}

/**
 * @desc Action creator for an action to be called when activity log messages is fetched.
 * @param {ActivityLogMessage[]} messages Activity log messages that was fetched.
 * @returns {{type: string, messages: ActivityLogMessage[]}} An action.
 */
export function doneFetchMessages(messages: [ActivityLogMessage]) {
  return {
    type: DONE_FETCH_MESSAGES,
    messages,
  };
}

/**
 * @desc Action for an action that adds dummy activity log message for testing purposes.
 * @returns {{type: string}} An action.
 */
export function addDummyMessage() {
  return {
    type: ADD_DUMMY_MESSAGE,
  };
}
