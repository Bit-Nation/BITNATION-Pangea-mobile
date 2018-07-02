// @flow

import type { DApp } from '../types/DApp';
import {
  type Action,
  OPEN_DAPP,
} from '../actions/dApps';

export type State = {
  +availableDApps: Array<DApp>,
  +contexts: { [string]: Object },
};

export const initialState: State = {
  /**
   * @desc Array of DApps currently saved in database
   */
  // @todo Import from registry.
  availableDApps: [],
  /**
   * @desc Dictionary that contains context for each DApp id.
   */
  contexts: {},
};

export const getDApp = (state: State, publicKey: string) => state.availableDApps.find(dApp => dApp.publicKey === publicKey);

/**
 * @desc DApps reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case OPEN_DAPP: {
      if (getDApp(state, action.dAppPublicKey) == null) {
        return state;
      }

      return {
        ...state,
        contexts: {
          ...state.contexts,
          [action.dAppPublicKey]: action.context,
        },
      };
    }
    default:
      return state;
  }
};
