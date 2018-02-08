import { ACTIVITY_MESSAGES_LIMIT } from '../global/Constants';

export const MESSAGE_ADDED = 'MESSAGE_ADDED';
export const START_FETCH_MESSAGES = 'START_FETCH_MESSAGES';
export const DONE_FETCH_MESSAGES = 'DONE_FETCH_MESSAGES';
export const ADD_DUMMY_MESSAGE = 'ADD_DUMMY_MESSAGE';

export function messageAdded(message) {
  return {
    type: MESSAGE_ADDED,
    message,
  };
}

export function startFetchMessages(limit = ACTIVITY_MESSAGES_LIMIT) {
  return {
    type: START_FETCH_MESSAGES,
    limit,
  };
}

export function doneFetchMessages(messages) {
  return {
    type: DONE_FETCH_MESSAGES,
    messages,
  };
}

export function addDummyMessage() {
  return {
    type: ADD_DUMMY_MESSAGE,
  };
}
