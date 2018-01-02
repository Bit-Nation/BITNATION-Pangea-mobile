import {
  CREATE_WALLET,
  RESTORE_WALLET,
  CREATE_MNEMONIC,
} from '../actions/wallet';

const initialState = {
  wallets: [
    {
      ethAddress: '0xEfdFc89Eb3630b4d99844126E15a72e685a80508',
      balance: 1.7534,
      currency: 'ETH',
      name: 'Ethereum',
    }
  ],
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
