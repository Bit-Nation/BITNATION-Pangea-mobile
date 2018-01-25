export const CREATE_PRIVATE_KEY = 'CREATE_PRIVATE_KEY';
export const REMOVE_PRIVATE_KEY = 'REMOVE_PRIVATE_KEY';
export const REMOVE_ALL_PRIVATE_KEYS = 'REMOVE_ALL_PRIVATE_KEYS';
export const MNEMONIC_CREATED = 'CREATE_MNEMONIC';
export const SAVE_PRIVATE_KEY = 'SAVE_PRIVATE_KEY';
export const VALIDATE_ENTERED_MNEMONIC = 'VALIDATE_ENTERED_MNEMONIC';
export const CHANGE_MNEMONIC_VALID = 'CHANGE_MNEMONIC_VALID';
export const CHANGE_ENTERED_MNEMONIC = 'CHANGE_ENTERED_MNEMONIC';

export function createPrivateKey() {
  return {
    type: CREATE_PRIVATE_KEY,
  };
}

export function removeAllPrivateKeys() {
  return {
    type: REMOVE_ALL_PRIVATE_KEYS,
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

export function validateEnteredMnemonic() {
  return {
    type: VALIDATE_ENTERED_MNEMONIC,
  };
}

export function changeMnemonicValid(valid) {
  return {
    type: CHANGE_MNEMONIC_VALID,
    mnemonicValid: valid,
  };
}

export function changeEnteredMnemonic(mnemonic) {
  return {
    type: CHANGE_ENTERED_MNEMONIC,
    mnemonic,
  };
}