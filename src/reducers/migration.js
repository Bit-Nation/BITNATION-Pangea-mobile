// @flow

import { type Action, STORE_VERSION } from '../actions/migration';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';

export type State = {
  migrationVersion: string,
};

export const initialState: State = {
  migrationVersion: '',
};

  /**
   * @desc Activity reducer.
   * @param {State} state Current state.
   * @param {Action} action Performed action.
   * @returns {State} Next state.
   */
export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    case SERVICES_DESTROYED:
      return initialState;
    case STORE_VERSION:
      return {
        ...state,
        migrationVersion: action.version,
      };
    default:
      return state;
  }
};
