import _ from 'lodash';

import {
  REQUEST_TRANSACTION_CONFIRMATION,
  SELECT_WALLET, SEND_MONEY, SEND_MONEY_FAILED, SEND_MONEY_SUCCESS, UPDATE_WALLET_BALANCE, WALLET_SYNC_FAILED,
  WALLETS_LIST_UPDATED,
} from '../actions/wallet';

const initialState = {
  wallets: null,
  selectedWalletAddress: null,
  moneySendingInProgress: false,
  moneySendingError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_WALLET:
      return Object.assign({}, state, { selectedWalletAddress: action.wallet.ethAddress });
    case WALLETS_LIST_UPDATED:
      return Object.assign({}, state, { wallets: action.wallets });
    case WALLET_SYNC_FAILED: {
      const walletIndex = _.findIndex(state.wallets, wallet => wallet.ethAddress === action.walletAddress);
      let newWallets = _.cloneDeep(state.wallets);
      newWallets[walletIndex].synchronizationError = action.error;
      return Object.assign({}, state, { wallets: newWallets });
    }
    case UPDATE_WALLET_BALANCE: {
      const walletIndex = _.findIndex(state.wallets, wallet => wallet.ethAddress === action.walletAddress);
      let newWallets = _.cloneDeep(state.wallets);
      newWallets[walletIndex].synchronizationError = undefined;
      return Object.assign({}, state, { wallets: newWallets });
    }
    case SEND_MONEY:
      return { ...state, moneySendingInProgress: true, moneySendingError: null };
    case SEND_MONEY_SUCCESS:
      return { ...state, moneySendingInProgress: false, moneySendingError: null };
    case SEND_MONEY_FAILED:
      return { ...state, moneySendingInProgress: false, moneySendingError: action.error };
  }
  return state;
}
