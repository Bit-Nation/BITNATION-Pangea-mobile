// @flow

import _ from 'lodash';

import {
  type Action,
  SELECT_WALLET,
  SEND_MONEY,
  SEND_MONEY_FAILED,
  SEND_MONEY_SUCCESS,
  UPDATE_WALLET_BALANCE,
  WALLET_SYNC_FAILED,
  WALLETS_LIST_UPDATED,
} from '../actions/wallet';
import type { WalletType } from '../types/Wallet';
import { getWalletIndex } from '../utils/wallet';

export type State = {
  +wallets: Array<WalletType> | null,
  +selectedWalletAddress: string | null,
  +moneySendingInProgress: boolean,
  +moneySendingError: Error | null,
};

export const initialState: State = {
  wallets: null,
  selectedWalletAddress: null,
  moneySendingInProgress: false,
  moneySendingError: null,
};

/**
 * @desc Wallet reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed Action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SELECT_WALLET:
      return Object.assign({}, state, { selectedWalletAddress: action.wallet.currency });
    case WALLETS_LIST_UPDATED:
      return Object.assign({}, state, { wallets: _.cloneDeep(action.wallets) });
    case WALLET_SYNC_FAILED: {
      const { walletAddress } = action;
      const walletIndex = getWalletIndex(state.wallets || [], walletAddress);
      const newWallets = _.cloneDeep(state.wallets);
      if (walletIndex === null) {
        return state;
      }
      newWallets[walletIndex].synchronizationError = action.error;
      return Object.assign({}, state, { wallets: newWallets });
    }
    case UPDATE_WALLET_BALANCE: {
      const { walletAddress } = action;
      const walletIndex = getWalletIndex(state.wallets || [], walletAddress);
      if (walletIndex === null) {
        return state;
      }
      const newWallets = _.cloneDeep(state.wallets);
      newWallets[walletIndex].synchronizationError = undefined;
      return Object.assign({}, state, { wallets: newWallets });
    }
    case SEND_MONEY:
      return { ...state, moneySendingInProgress: true, moneySendingError: null };
    case SEND_MONEY_SUCCESS:
      return { ...state, moneySendingInProgress: false, moneySendingError: null };
    case SEND_MONEY_FAILED:
      return { ...state, moneySendingInProgress: false, moneySendingError: action.error };
    default:
      return state;
  }
};
