import {
  CREATE_PRIVATE_KEY,
  MNEMONIC_CREATED,
} from '../actions/key';

const initialState = {
  walletCreatingInProgress: false,
  createdMnemonic: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PRIVATE_KEY:
      return Object.assign({}, state, { walletCreatingInProgress: true, createdMnemonic: null });
    case MNEMONIC_CREATED:
      return Object.assign({}, state, { createdMnemonic: action.mnemonic });
  }
  return state;
}


