import {
  CHANGE_MNEMONIC_VALID,
  CREATE_PRIVATE_KEY,
  MNEMONIC_CREATED, VALIDATE_MNEMONIC,
} from '../actions/key';

const initialState = {
  walletCreatingInProgress: false,
  createdMnemonic: null,
  mnemonicValid: null,
  mnemonicValidationInProgress: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PRIVATE_KEY:
      return Object.assign({}, state, { walletCreatingInProgress: true, createdMnemonic: null });
    case MNEMONIC_CREATED:
      return { ...state, createdMnemonic: action.mnemonic, mnemonicValid: null };
    case VALIDATE_MNEMONIC:
      return { ...state, mnemonicValid: null, mnemonicValidationInProgress: true, };
    case CHANGE_MNEMONIC_VALID:
      return { ...state, mnemonicValid: action.mnemonicValid, mnemonicValidationInProgress: false, };
  }
  return state;
}


