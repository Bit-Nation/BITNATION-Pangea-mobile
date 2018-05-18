// @flow

import _ from 'lodash';

import { type Action, MESSAGES_ADDED } from '../actions/activity';
import type { ActivityLogMessage } from '../types/ActivityLogMessage';
import { ACTIVITY_MESSAGES_LIMIT } from '../global/Constants';

export type State = {
  +messages: Array<ActivityLogMessage>
};

export const initialState: State = {
  messages: [],
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
    case MESSAGES_ADDED:
      return {
        ...state,
        messages: mergeMessages(state.messages, action.messages),
      };
    default:
      return state;
  }
};
