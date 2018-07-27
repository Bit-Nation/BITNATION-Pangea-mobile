// @flow

import { type Action  } from '../actions/migration';
import { SERVICES_CREATED, SERVICES_DESTROYED } from '../actions/serviceContainer';

export type State = {
  };

export const initialState: State = {
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
    default:
      return state;
  }
};
