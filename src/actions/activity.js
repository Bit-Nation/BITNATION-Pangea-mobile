// @flow

import { ACTIVITY_MESSAGES_LIMIT } from '../global/Constants';
import { type ActivityLogMessage } from '../types/ActivityLogMessage';

export const MESSAGE_ADDED = 'MESSAGE_ADDED';
export const START_FETCH_MESSAGES = 'START_FETCH_MESSAGES';
export const DONE_FETCH_MESSAGES = 'DONE_FETCH_MESSAGES';
export const ADD_DUMMY_MESSAGE = 'ADD_DUMMY_MESSAGE';
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';

type MessageAddedAction = { +type: 'MESSAGE_ADDED', +message: ActivityLogMessage };
type StartFetchMessagesAction = { +type: 'START_FETCH_MESSAGES', +limit: number };
type DoneFetchMessagesAction = { +type: 'DONE_FETCH_MESSAGES', +messages: Array<ActivityLogMessage> };
type AddDummyMessageAction = { +type: 'ADD_DUMMY_MESSAGE' };
type ShowSpinnerAction = { +type: 'SHOW_SPINNER' };
type HideSpinnerAction = { +type: 'HIDE_SPINNER' };

export type Action =
  | MessageAddedAction
  | StartFetchMessagesAction
  | DoneFetchMessagesAction
  | AddDummyMessageAction;

/**
 * @desc Action creator for an action that should be called once new activity log message added.
 * @param {ActivityLogMessage} message Activity log message that is added.
 * @returns {MessageAddedAction} An action.
 */
export function messageAdded(message: ActivityLogMessage): MessageAddedAction {
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
export function startFetchMessages(limit:
                                     number = ACTIVITY_MESSAGES_LIMIT): StartFetchMessagesAction {
  return {
    type: START_FETCH_MESSAGES,
    limit,
  };
}

/**
 * @desc Action creator for an action to be called when activity log messages is fetched.
 * @param {ActivityLogMessage[]} messages Activity log messages that was fetched.
 * @returns {DoneFetchMessagesAction} An action.
 */
export function doneFetchMessages(messages: Array<ActivityLogMessage>): DoneFetchMessagesAction {
  return {
    type: DONE_FETCH_MESSAGES,
    messages,
  };
}

/**
 * @desc Action for an action that adds dummy activity log message for testing purposes.
 * @returns {AddDummyMessageAction} An action.
 */
export function addDummyMessage(): AddDummyMessageAction {
  return {
    type: ADD_DUMMY_MESSAGE,
  };
}

/**
 * @desc Action for an action that shows spinner while processing in background
 * @returns {ShowSpinnerAction} An action.
 */
export function showSpinner(): ShowSpinnerAction {
  return {
    type: SHOW_SPINNER,
  };
}

/**
 * @desc Action for an action that hide spinner after the process is completed
 * @returns {HideSpinnerAction} An action.
 */
export function hideSpinner(): HideSpinnerAction {
  return {
    type: HIDE_SPINNER,
  };
}
