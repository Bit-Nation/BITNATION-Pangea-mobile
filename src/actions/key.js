// @flow

import { type Mnemonic } from '../types/Mnemonic';

type CreatePrivateKeyAction = { type: 'CREATE_PRIVATE_KEY' };
type RemoveAllPrivateKeysAction = { type: 'REMOVE_ALL_PRIVATE_KEYS' };
type RemovePrivateKeyAction = { type: 'REMOVE_PRIVATE_KEY' };
type MnemonicCreatedAction = { type: 'MNEMONIC_CREATED', mnemonic: Mnemonic };
type SavePrivateKeyAction = { type: 'SAVE_PRIVATE_KEY' };
type ValidateEnteredMnemonicAction = { type: 'VALIDATE_ENTERED_MNEMONIC' };
type ChangeMnemonicValidAction = { type: 'CHANGE_MNEMONIC_VALID', mnemonicValid: boolean | null };
type ChangeEnteredMnemonicAction = { type: 'CHANGE_ENTERED_MNEMONIC', mnemonic: Mnemonic };

export type Action =
  | CreatePrivateKeyAction
  | RemoveAllPrivateKeysAction
  | RemovePrivateKeyAction
  | MnemonicCreatedAction
  | SavePrivateKeyAction
  | ValidateEnteredMnemonicAction
  | ChangeMnemonicValidAction
  | ChangeEnteredMnemonicAction;

export const CREATE_PRIVATE_KEY = 'CREATE_PRIVATE_KEY';
export const REMOVE_PRIVATE_KEY = 'REMOVE_PRIVATE_KEY';
export const REMOVE_ALL_PRIVATE_KEYS = 'REMOVE_ALL_PRIVATE_KEYS';
export const MNEMONIC_CREATED = 'MNEMONIC_CREATED';
export const SAVE_PRIVATE_KEY = 'SAVE_PRIVATE_KEY';
export const VALIDATE_ENTERED_MNEMONIC = 'VALIDATE_ENTERED_MNEMONIC';
export const CHANGE_MNEMONIC_VALID = 'CHANGE_MNEMONIC_VALID';
export const CHANGE_ENTERED_MNEMONIC = 'CHANGE_ENTERED_MNEMONIC';

/**
 * @desc Action creator for an action that should be called on start of
 * private key creation process.
 * @returns {CreatePrivateKeyAction} An action.
 */
export function createPrivateKey(): CreatePrivateKeyAction {
  return {
    type: CREATE_PRIVATE_KEY,
  };
}

/**
 * @desc Action creator for an action that removes all saved private keys.
 * @returns {RemoveAllPrivateKeysAction} An action.
 */
export function removeAllPrivateKeys(): RemoveAllPrivateKeysAction {
  return {
    type: REMOVE_ALL_PRIVATE_KEYS,
  };
}

/**
 * @desc Action creator for an action that removes currently creating private key.
 * @returns {RemovePrivateKeyAction} An action.
 */
export function removePrivateKey(): RemovePrivateKeyAction {
  return {
    type: REMOVE_PRIVATE_KEY,
  };
}

/**
 * @desc Action creator for an action that should be called when
 * mnemonic for private key is created.
 * @param {Mnemonic} mnemonic Mnemonic that is created.
 * @returns {MnemonicCreatedAction} An action.
 */
export function mnemonicCreated(mnemonic: Mnemonic): MnemonicCreatedAction {
  return {
    type: MNEMONIC_CREATED,
    mnemonic,
  };
}

/**
 * @desc Action creator for an action that starts private key saving.
 * @returns {SavePrivateKeyAction} An action.
 */
export function savePrivateKey(): SavePrivateKeyAction {
  return {
    type: SAVE_PRIVATE_KEY,
  };
}

/**
 * @desc Action creator for an action that starts entered mnemonic validation process.
 * @returns {ValidateEnteredMnemonicAction} An action.
 */
export function validateEnteredMnemonic(): ValidateEnteredMnemonicAction {
  return {
    type: VALIDATE_ENTERED_MNEMONIC,
  };
}

/**
 * @desc Action creator for an action that should be called once
 * mnemonic validation status is changed.
 * @param {(boolean|null)} valid Flag that shows if mnemonic is valid.
 * Null is used to mark an undefined state of validation (while it is in progress).
 * @returns {ChangeMnemonicValidAction} An action.
 */
export function changeMnemonicValid(valid: boolean | null): ChangeMnemonicValidAction {
  return {
    type: CHANGE_MNEMONIC_VALID,
    mnemonicValid: valid,
  };
}

/**
 * @desc Action creator for an action that should be called once entered mnemonic is changed.
 * @param {Mnemonic} mnemonic Mnemonic that is entered.
 * @returns {ChangeEnteredMnemonicAction} An action.
 */
export function changeEnteredMnemonic(mnemonic: Mnemonic): ChangeEnteredMnemonicAction {
  return {
    type: CHANGE_ENTERED_MNEMONIC,
    mnemonic,
  };
}
