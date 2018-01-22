import {
  REQUEST_TRANSACTION_CONFIRMATION,
  SELECT_WALLET, SEND_MONEY, SEND_MONEY_FAILED, SEND_MONEY_SUCCESS,
  WALLETS_LIST_UPDATED,
} from '../actions/wallet';

const initialState = {
  wallets: null,
  selectedWalletAddress: null,
  moneySendingInProgress: false,
  moneySendingError: null,
  transactionToConfirm: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_WALLET:
      return Object.assign({}, state, { selectedWalletAddress: action.wallet.ethAddress });
    case WALLETS_LIST_UPDATED:
      return Object.assign({}, state, { wallets: action.wallets });
    case SEND_MONEY:
      return { ...state, moneySendingInProgress: true, moneySendingError: null };
    case SEND_MONEY_SUCCESS:
      return { ...state, moneySendingInProgress: false, moneySendingError: null };
    case SEND_MONEY_FAILED:
      return { ...state, moneySendingInProgress: false, moneySendingError: action.error };
    case REQUEST_TRANSACTION_CONFIRMATION:
      return { ...state, transactionToConfirm: action.transaction };
  }
  return state;
}
