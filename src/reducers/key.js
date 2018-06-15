// @flow

import {
  type Action,
  CHANGE_ENTERED_MNEMONIC,
  CHANGE_MNEMONIC_VALID,
  VALIDATE_ENTERED_MNEMONIC,
} from '../actions/key';
import type { Mnemonic } from '../types/Mnemonic';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';

export type State = {
  +enteredMnemonic: Mnemonic | null,
  +mnemonicValid: boolean | null,
  +mnemonicValidationInProgress: boolean,
}

export const initialState: State = {
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
    case SERVICES_DESTROYED:
      return initialState;
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

