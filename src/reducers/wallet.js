// @flow

import _ from 'lodash';

import {
  type Action,
  SELECT_WALLET,
  SEND_MONEY,
  SEND_MONEY_FAILED,
  SEND_MONEY_SUCCESS,
  UPDATE_WALLET_BALANCE,
  UPDATE_WALLET_LIST,
  WALLET_SYNC_FAILED,
  WALLETS_LIST_UPDATED,
} from '../actions/wallet';
import type { WalletType } from '../types/Wallet';
import { getWalletIndex } from '../utils/wallet';
import { SERVICES_DESTROYED, type ServicesDestroyedAction } from '../actions/serviceContainer';

export type State = {
  +wallets: Array<WalletType> | null,
  +selectedWalletCurrency: string | null,
  +selectedWalletAddress: string | null,
  +moneySendingInProgress: boolean,
  +moneySendingError: Error | null,
  +moneySendingSuccess: boolean,
  +isRefreshing: boolean,
};

export const initialState: State = {
  wallets: null,
  selectedWalletCurrency: null,
  selectedWalletAddress: null,
  moneySendingInProgress: false,
  moneySendingError: null,
  moneySendingSuccess: false,
  isRefreshing: false,
};

/**
 * @desc Wallet reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed Action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action | ServicesDestroyedAction): State => {
  switch (action.type) {
    case SERVICES_DESTROYED:
      return initialState;
    case UPDATE_WALLET_LIST:
      return {
        ...state,
        isRefreshing: true,
      };
    case SELECT_WALLET:
      return Object.assign({}, state, { selectedWalletCurrency: action.wallet.currency, selectedWalletAddress: action.wallet.ethAddress });
    case WALLETS_LIST_UPDATED:
      return Object.assign({}, state, { wallets: _.cloneDeep(action.wallets), isRefreshing: !action.syncDone });
    case WALLET_SYNC_FAILED: {
      const { walletAddress, walletCurrency, error } = action;
      const wallets = state.wallets || [];
      const walletIndex = getWalletIndex(wallets, walletAddress, walletCurrency);
      if (walletIndex === null) {
        return state;
      }
      return {
        ...state,
        isRefreshing: false,
        wallets: wallets.map((item, index) => {
          if (index !== walletIndex) {
            return item;
          }

          return {
            ...item,
            synchronizationError: error,
          };
        }),
      };
    }
    case UPDATE_WALLET_BALANCE: {
      const { walletAddress, walletCurrency } = action;
      const wallets = state.wallets || [];
      const walletIndex = getWalletIndex(wallets, walletAddress, walletCurrency);
      if (walletIndex === null) {
        return state;
      }
      return {
        ...state,
        isRefreshing: true,
        wallets: wallets.map((item, index) => {
          if (index !== walletIndex) {
            return item;
          }

          return {
            ...item,
            synchronizationError: undefined,
          };
        }),
      };
    }
    case SEND_MONEY:
      return {
        ...state, moneySendingInProgress: true, moneySendingError: null, moneySendingSuccess: false,
      };
    case SEND_MONEY_SUCCESS:
      return {
        ...state, moneySendingInProgress: false, moneySendingError: null, moneySendingSuccess: true,
      };
    case SEND_MONEY_FAILED:
      return { ...state, moneySendingInProgress: false, moneySendingError: action.error };
    default:
      return state;
  }
};
