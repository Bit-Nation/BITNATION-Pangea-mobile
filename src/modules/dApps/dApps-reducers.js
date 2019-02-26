// @flow

import type { DApp, DAppChatContext } from './DApp-types';
import {
  type Action,
  DAPP_LAUNCH_STATE_CHANGED,
  DAPPS_LIST_UPDATED,
  STORE_DAPP_MODAL,
  CLEAN_DAPP_MODAL,
  SET_DAPP_CONTEXT,
} from './dApps-actions';
import { SERVICES_DESTROYED } from '../../../src-old/actions/serviceContainer';
import { type DAppModalInfo } from './DApp-types';

export type DAppLaunchState = 'off' | 'starting' | 'started' | 'opened' | 'working';

export type State = {
  +availableDApps: Array<DApp>,
  +context: DAppChatContext | null,
  +dAppsLaunchState: { [string]: DAppLaunchState },
  +modals: { [string]: DAppModalInfo },
};

export const initialState: State = {
  /**
   * @desc Array of DApps currently saved in database
   */
  availableDApps: [],
  /**
   * @desc Dictionary that contains context for each DApp id.
   */
  context: null,
  /**
   * @desc Map from DApps ids to their launch states.
   */
  dAppsLaunchState: {},
  /**
   * @desc Map from modal ids to modal info.
   */
  modals: {},
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
    case SET_DAPP_CONTEXT: {
      return {
        ...state,
        context: {
          ...action.context,
        },
      };
    }
    case STORE_DAPP_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.modal.modalID]: action.modal,
        },
      };
    case CLEAN_DAPP_MODAL: {
      const newModals = { ...state.modals };
      delete newModals[action.modalID];

      return {
        ...state,
        modals: newModals,
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
