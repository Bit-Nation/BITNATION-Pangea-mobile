// @flow

import type { DApp } from '../types/DApp';
import {
  type Action,
  DAPP_LAUNCH_STATE_CHANGED,
  DAPPS_LIST_UPDATED,
  OPEN_DAPP,
} from '../actions/dApps';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';

export type DAppLaunchState = 'off' | 'starting' | 'started' | 'opened';

export type State = {
  +availableDApps: Array<DApp>,
  +contexts: { [string]: Object },
  +dAppsLaunchState: { [string]: DAppLaunchState },
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
   * @desc Map from DApps ids to their launch states.
   */
  dAppsLaunchState: {},
};

export const getDApp = (state: State, publicKey: string) => state.availableDApps.find(dApp => dApp.publicKey === publicKey);
export const getDAppLaunchState = (state: State, publicKey: string) => state.dAppsLaunchState[publicKey];


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
    case DAPPS_LIST_UPDATED: {
      const newDAppsLaunchState = {};
      action.availableDApps.forEach((dApp) => {
        const launchState = getDAppLaunchState(state, dApp.publicKey);
        newDAppsLaunchState[dApp.publicKey] = launchState || 'off';
      });

      return {
        ...state,
        availableDApps: action.availableDApps,
        dAppsLaunchState: newDAppsLaunchState,
      };
    }
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
    case DAPP_LAUNCH_STATE_CHANGED: {
      const { dAppPublicKey, launchState } = action;

      return {
        ...state,
        dAppsLaunchState: {
          ...state.dAppsLaunchState,
          [dAppPublicKey]: launchState,
        },
      };
    }
    default:
      return state;
  }
};
