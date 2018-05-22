// @flow

import { type Mnemonic } from '../types/Mnemonic';

type ValidateEnteredMnemonicAction = { +type: 'VALIDATE_ENTERED_MNEMONIC' };
type ChangeMnemonicValidAction = { +type: 'CHANGE_MNEMONIC_VALID', +mnemonicValid: boolean | null };
type ChangeEnteredMnemonicAction = { +type: 'CHANGE_ENTERED_MNEMONIC', +mnemonic: Mnemonic };

export type Action =
  | ValidateEnteredMnemonicAction
  | ChangeMnemonicValidAction
  | ChangeEnteredMnemonicAction;

export const VALIDATE_ENTERED_MNEMONIC = 'VALIDATE_ENTERED_MNEMONIC';
export const CHANGE_MNEMONIC_VALID = 'CHANGE_MNEMONIC_VALID';
export const CHANGE_ENTERED_MNEMONIC = 'CHANGE_ENTERED_MNEMONIC';

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
