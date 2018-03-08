// @flow

import _ from 'lodash';

import {
  type Action,
  DONE_FETCH_MESSAGES,
  MESSAGE_ADDED,
  START_FETCH_MESSAGES,
  SHOW_SPINNER,
  HIDE_SPINNER
} from '../actions/activity';
import type { ActivityLogMessage } from '../types/ActivityLogMessage';
import { ACTIVITY_MESSAGES_LIMIT } from '../global/Constants';

type State = {
  +messages: Array<ActivityLogMessage>,
  +isFetching: boolean,
};

export const initialState: State = {
  messages: [],
  isFetching: false,
};

/**
 * @desc Function to merge two arrays of activity log messages.
 * Messages are compared by id and sorted in descending order of id (newest at the beginning).
 * @param {ActivityLogMessage[]} currentMessages Current messages array.
 * @param {ActivityLogMessage[]} newMessages New messages array to be merged with current.
 * @param {number} limit Limit of count in resulted array.
 * @returns {ActivityLogMessage[]} Merged messages.
 */
export function mergeMessages(
  currentMessages: Array<ActivityLogMessage>,
  newMessages: Array<ActivityLogMessage>,
  limit: number = ACTIVITY_MESSAGES_LIMIT,
): Array<ActivityLogMessage> {
  const getId = message => -message.id;
  const allMessages = _.concat(currentMessages, newMessages);
  const uniqueMessages = _.sortedUniqBy(_.sortBy(allMessages, getId), getId);
  return _.take(uniqueMessages, limit);
}

/**
 * @desc Activity reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case MESSAGE_ADDED:
      return {
        ...state,
        messages: mergeMessages(state.messages, [action.message]),
      };
    case START_FETCH_MESSAGES:
      return {
        ...state,
        isFetching: true,
      };
    case DONE_FETCH_MESSAGES:
      return {
        ...state,
        messages: mergeMessages(state.messages, action.messages),
        isFetching: false,
      };
    case SHOW_SPINNER:
      return {
        ...state,
        isFetching: true
      };
    case HIDE_SPINNER:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
