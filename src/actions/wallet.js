export const SELECT_WALLET = 'SELECT_WALLET';
export const SEND_MONEY = 'SEND_MONEY';
export const SEND_MONEY_SUCCESS = 'SEND_MONEY_SUCCESS';
export const SEND_MONEY_FAILED = 'SEND_MONEY_FAILED';
export const WALLETS_LIST_UPDATED = 'WALLETS_LIST_UPDATED';
export const WALLET_SYNC_FAILED = 'WALLET_SYNC_FAILED';
export const UPDATE_WALLET_LIST = 'UPDATE_WALLET_LIST';
export const UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE';

export function selectWallet(wallet) {
  return {
    type: SELECT_WALLET,
    wallet,
  };
}

export function sendMoney(amount, toEthAddress, message) {
  return {
    type: SEND_MONEY,
    amount,
    toEthAddress,
    message,
  };
}

export function walletsListUpdated(wallets) {
  return {
    type: WALLETS_LIST_UPDATED,
    wallets,
  };
}

export function updateWalletList() {
  return {
    type: UPDATE_WALLET_LIST,
  };
}

export function updateWalletBalance(walletAddress) {
  return {
    type: UPDATE_WALLET_BALANCE,
    walletAddress,
  };
}

export function sendMoneySuccess() {
  return {
    type: SEND_MONEY_SUCCESS,
  };
}

export function sendMoneyFailed(error) {
  return {
    type: SEND_MONEY_FAILED,
    error,
  };
}

export function walletSyncFailed(walletAddress, error) {
  return {
    type: WALLET_SYNC_FAILED,
    walletAddress,
    error,
  };
}