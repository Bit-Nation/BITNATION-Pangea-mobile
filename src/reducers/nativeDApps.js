// @flow

import type { DAppType } from '../dapps';
import {
  type Action,
  OPEN_DAPP,
} from '../actions/nativeDApps';
import dApps from '../dapps';

export type State = {
  +availableDApps: Array<DAppType>,
  +contexts: { [string]: Object },
};

export const initialState: State = {
  /**
   * @desc Array of DApps currently saved in database
   */
  availableDApps: dApps,
  /**
   * @desc Dictionary that contains context for each DApp id.
   */
  contexts: {},
};

export const getDApp = (state: State, publicKey: string) => state.availableDApps.find(dApp => dApp.identityPublicKey === publicKey);

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
