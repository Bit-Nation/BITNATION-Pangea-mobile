// @flow

import {
  type Action,
  CHANGE_ENTERED_MNEMONIC,
  CHANGE_MNEMONIC_VALID,
  CREATE_PRIVATE_KEY,
  MNEMONIC_CREATED,
  REMOVE_PRIVATE_KEY,
  VALIDATE_ENTERED_MNEMONIC,
} from '../actions/key';
import type { Mnemonic } from '../types/Mnemonic';

type State = {
  +createdMnemonic: Mnemonic | null,
  +enteredMnemonic: Mnemonic | null,
  +mnemonicValid: boolean | null,
  +mnemonicValidationInProgress: boolean,
}

const initialState: State = {
  createdMnemonic: null,
  enteredMnemonic: null,
  mnemonicValid: null,
  mnemonicValidationInProgress: false,
};

/**
 * @desc Key reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CREATE_PRIVATE_KEY:
      return { ...state, createdMnemonic: null, enteredMnemonic: null };
    case REMOVE_PRIVATE_KEY:
      return { ...state, createdMnemonic: null, enteredMnemonic: null };
    case MNEMONIC_CREATED:
      return { ...state, createdMnemonic: action.mnemonic, mnemonicValid: null };
    case CHANGE_ENTERED_MNEMONIC:
      return { ...state, enteredMnemonic: action.mnemonic };
    case VALIDATE_ENTERED_MNEMONIC:
      return { ...state, mnemonicValid: null, mnemonicValidationInProgress: true };
    case CHANGE_MNEMONIC_VALID:
      return { ...state, mnemonicValid: action.mnemonicValid, mnemonicValidationInProgress: false };
    default:
      return state;
  }
};

