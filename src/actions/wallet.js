export const CREATE_WALLET = 'CREATE_WALLET';
export const CREATE_MNEMONIC = 'CREATE_MNEMONIC';
export const RESTORE_WALLET = 'RESTORE_WALLET';

export function createWallet(privateKey) {
  return {
    type: CREATE_WALLET,
    privateKey,
  };
}

export function createMnemonic(mnemonic) {
  return {
    type: CREATE_MNEMONIC,
    mnemonic,
  };
}

export function restoreWallet(privateKey) {
  return {
    type: RESTORE_WALLET,
    privateKey,
  };
}