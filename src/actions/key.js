export const CREATE_PRIVATE_KEY = 'CREATE_PRIVATE_KEY';
export const REMOVE_PRIVATE_KEY = 'REMOVE_PRIVATE_KEY';
export const MNEMONIC_CREATED = 'CREATE_MNEMONIC';
export const SAVE_PRIVATE_KEY = 'SAVE_PRIVATE_KEY';
export const VALIDATE_MNEMONIC = 'VALIDATE_MNEMONIC';
export const CHANGE_MNEMONIC_VALID = 'CHANGE_MNEMONIC_VALID';

export function createPrivateKey() {
  return {
    type: CREATE_PRIVATE_KEY,
  };
}

export function removePrivateKey() {
  return {
    type: REMOVE_PRIVATE_KEY,
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

export function validateMnemonic(mnemonic) {
  return {
    type: VALIDATE_MNEMONIC,
    mnemonic,
  };
}

export function changeMnemonicValid(valid) {
  return {
    type: CHANGE_MNEMONIC_VALID,
    mnemonicValid: valid,
  };
}