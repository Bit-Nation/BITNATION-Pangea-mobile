// @flow

import type { DApp } from '../types/DApp';
import {
  type Action, DAPP_START_FAILED, DAPP_STARTED,
  DAPPS_LIST_UPDATED,
  OPEN_DAPP,
} from '../actions/dApps';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';

export type State = {
  +availableDApps: Array<DApp>,
  +contexts: { [string]: Object },
  +startedDAppIds: Array<string>,
};

export const initialState: State = {
  /**
   * @desc Array of DApps currently saved in database
   */
  availableDApps: [],
  /**
   * @desc Dictionary that contains context for each DApp id.
   */
  contexts: {},
  /**
   * @desc Array of ids of DApps that is started (prepared to be opened).
   */
  startedDAppIds: [],
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
    case SERVICES_DESTROYED:
      return initialState;
    case DAPPS_LIST_UPDATED:
      return {
        ...state,
        availableDApps: action.availableDApps,
      };
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
    case DAPP_STARTED: {
      if (state.startedDAppIds.includes(action.dAppPublicKey)) {
        return state;
      }

      return {
        ...state,
        startedDAppIds: [
          ...state.startedDAppIds,
          action.dAppPublicKey,
        ],
      };
    }
    case DAPP_START_FAILED: {
      const { dAppPublicKey } = action;

      return {
        ...state,
        startedDAppIds: state.startedDAppIds.filter(id => id !== dAppPublicKey),
      };
    }
    default:
      return state;
  }
};
