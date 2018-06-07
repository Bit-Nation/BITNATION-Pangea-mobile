// @flow

import _ from 'lodash';

import { type Action, MESSAGES_UPDATED } from '../actions/activity';
import type { ActivityLogMessage } from '../types/ActivityLogMessage';
import { ACTIVITY_MESSAGES_LIMIT } from '../global/Constants';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';

export type State = {
  +messages: Array<ActivityLogMessage>
};

export const initialState: State = {
  messages: [],
};

/**
 * @desc Activity reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SERVICES_DESTROYED:
      return initialState;
    case MESSAGES_UPDATED:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};
