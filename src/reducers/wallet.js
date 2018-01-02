import {
  CREATE_WALLET,
  RESTORE_WALLET,
  CREATE_MNEMONIC,
} from '../actions/wallet';

const initialState = {
  ethAddress: null,
  walletCreatingInProgress: false,
  walletRestoreInProgress: false,
  createdMnemonic: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_WALLET:
      return Object.assign({}, state, { walletCreatingInProgress: true, createdMnemonic: null });
    case RESTORE_WALLET:
      return Object.assign({}, state, { walletRestoreInProgress: true });
    case CREATE_MNEMONIC:
      return Object.assign({}, state, { createdMnemonic: action.mnemonic });
  }
  return state;
}
