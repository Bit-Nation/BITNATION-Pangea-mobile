import {
  SELECT_WALLET,
  WALLETS_LIST_UPDATED,
} from '../actions/wallet';

const initialState = {
  wallets: null,
  selectedWalletAddress: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_WALLET:
      return Object.assign({}, state, { selectedWalletAddress: action.wallet.ethAddress });
    case WALLETS_LIST_UPDATED:
      return Object.assign({}, state, { wallets: action.wallets });
  }
  return state;
}
