export const SELECT_WALLET = 'SELECT_WALLET';
export const SEND_MONEY = 'SEND_MONEY';
export const WALLETS_LIST_UPDATED = 'WALLETS_LIST_UPDATED';
export const UPDATE_WALLET_LIST = 'UPDATE_WALLET_LIST';
export const UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE';

export function selectWallet(wallet) {
  return {
    type: SELECT_WALLET,
    wallet,
  };
}

export function sendMoney(wallet, amount, toEthAddress, message) {
  return {
    type: SEND_MONEY,
    wallet,
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

export function updateWalletBalance(wallet) {
  return {
    type: UPDATE_WALLET_BALANCE,
    wallet,
  };
}