import _ from 'lodash';

import { ADD_DUMMY_MESSAGE, DONE_FETCH_MESSAGES, MESSAGE_ADDED, START_FETCH_MESSAGES } from '../actions/activity';
import { ACTIVITY_MESSAGES_LIMIT } from '../global/Constants';

export const initialState = {
  messages: [],
  isFetching: false,
};

export function mergeMessages(currentMessages, newMessages, limit = ACTIVITY_MESSAGES_LIMIT) {
  const getId = message => -message.id;
  const allMessages = _.concat(currentMessages, newMessages);
  const uniqueMessages = _.sortedUniqBy(_.sortBy(allMessages, getId), getId);
  return _.take(uniqueMessages, limit);
}

export default function (state = initialState, action) {
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
  }
  return state;
}
