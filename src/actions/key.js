export const CREATE_PRIVATE_KEY = 'CREATE_PRIVATE_KEY';
export const MNEMONIC_CREATED = 'CREATE_MNEMONIC';
export const SAVE_PRIVATE_KEY = 'SAVE_PRIVATE_KEY';

export function createPrivateKey() {
  return {
    type: CREATE_PRIVATE_KEY,
  };
}

export function mnemonicCreated(mnemonic) {
  return {
    type: MNEMONIC_CREATED,
    mnemonic,
  };
}

export function savePrivateKey() {
  return {
    type: SAVE_PRIVATE_KEY,
  };
}
