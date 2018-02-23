// @flow

import { type Mnemonic } from '../types/Mnemonic';

export const CREATE_PRIVATE_KEY = 'CREATE_PRIVATE_KEY';
export const REMOVE_PRIVATE_KEY = 'REMOVE_PRIVATE_KEY';
export const REMOVE_ALL_PRIVATE_KEYS = 'REMOVE_ALL_PRIVATE_KEYS';
export const MNEMONIC_CREATED = 'CREATE_MNEMONIC';
export const SAVE_PRIVATE_KEY = 'SAVE_PRIVATE_KEY';
export const VALIDATE_ENTERED_MNEMONIC = 'VALIDATE_ENTERED_MNEMONIC';
export const CHANGE_MNEMONIC_VALID = 'CHANGE_MNEMONIC_VALID';
export const CHANGE_ENTERED_MNEMONIC = 'CHANGE_ENTERED_MNEMONIC';

/**
 * @desc Action creator for an action that should be called on start of
 * private key creation process.
 * @returns {{type: string}} An action.
 */
export function createPrivateKey() {
  return {
    type: CREATE_PRIVATE_KEY,
  };
}

/**
 * @desc Action creator for an action that removes all saved private keys.
 * @returns {{type: string}} An action.
 */
export function removeAllPrivateKeys() {
  return {
    type: REMOVE_ALL_PRIVATE_KEYS,
  };
}

/**
 * @desc Action creator for an action that removes currently creating private key.
 * @returns {{type: string}} An action.
 */
export function removePrivateKey() {
  return {
    type: REMOVE_PRIVATE_KEY,
  };
}

/**
 * @desc Action creator for an action that should be called when
 * mnemonic for private key is created.
 * @param {Mnemonic} mnemonic Mnemonic that is created.
 * @returns {{type: string, mnemonic: *}} An action.
 */
export function mnemonicCreated(mnemonic: Mnemonic) {
  return {
    type: MNEMONIC_CREATED,
    mnemonic,
  };
}

/**
 * @desc Action creator for an action that starts private key saving.
 * @returns {{type: string}} An action.
 */
export function savePrivateKey() {
  return {
    type: SAVE_PRIVATE_KEY,
  };
}

/**
 * @desc Action creator for an action that starts entered mnemonic validation process.
 * @returns {{type: string}} An action.
 */
export function validateEnteredMnemonic() {
  return {
    type: VALIDATE_ENTERED_MNEMONIC,
  };
}

/**
 * @desc Action creator for an action that should be called once
 * mnemonic validation status is changed.
 * @param {(boolean|null)} valid Flag that shows if mnemonic is valid.
 * Null is used to mark an undefined state of validation (while it is in progress).
 * @returns {{type: string, mnemonicValid: (boolean|null)}} An action.
 */
export function changeMnemonicValid(valid: boolean | null) {
  return {
    type: CHANGE_MNEMONIC_VALID,
    mnemonicValid: valid,
  };
}

/**
 * @desc Action creator for an action that should be called once entered mnemonic is changed.
 * @param {Mnemonic} mnemonic Mnemonic that is entered.
 * @returns {{type: string, mnemonic: *}} An action.
 */
export function changeEnteredMnemonic(mnemonic: Mnemonic) {
  return {
    type: CHANGE_ENTERED_MNEMONIC,
    mnemonic,
  };
}
