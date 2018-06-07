import reducer, { initialState } from '../../../src/reducers/wallet';
import {
  selectWallet,
  sendMoney,
  sendMoneyFailed,
  sendMoneySuccess,
  updateWalletBalance,
  walletsListUpdated,
  walletSyncFailed,
} from '../../../src/actions/wallet';

const mockWallet = {
  ethAddress: '0xtestAddress',
  currency: 'ETH',
  balance: null,
  name: 'Test wallet',
};

const mockError = {
  error: 'ERROR',
};

describe('wallet reducer action handling', () => {
  test('default returns the same state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  const stateWithWallets = reducer(initialState, walletsListUpdated([mockWallet]));

  test('selectWallet', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, selectWallet(mockWallet));
    expect(stateAfter).toEqual({
      ...stateBefore,
      selectedWalletAddress: mockWallet.ethAddress,
      selectedWalletCurrency: mockWallet.currency,
    });
  });

  test('walletListUpdated', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, walletsListUpdated([mockWallet]));
    expect(stateAfter).toEqual({
      ...stateBefore,
      wallets: [mockWallet],
    });
  });

  test('walletSyncFailed', () => {
    const stateBefore = stateWithWallets;
    const stateAfter = reducer(stateBefore, walletSyncFailed(mockWallet.ethAddress, mockWallet.currency, mockError));
    expect(stateAfter).toEqual({
      ...stateBefore,
      wallets: [{ ...mockWallet, synchronizationError: mockError }],
    });
  });

  test('updateWalletBalance', () => {
    const stateBefore = stateWithWallets;
    const stateAfter = reducer(stateBefore, updateWalletBalance(mockWallet.ethAddress));
    expect(stateAfter).toEqual({
      ...stateBefore,
      wallets: [{ ...mockWallet, synchronizationError: undefined }],
    });
  });

  test('sendMoney', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, sendMoney(0.1, mockWallet.ethAddress));
    expect(stateAfter).toEqual({
      ...stateBefore,
      moneySendingError: null,
      moneySendingInProgress: true,
    });
  });

  test('sendMoneySuccess', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, sendMoneySuccess());
    expect(stateAfter).toEqual({
      ...stateBefore,
      moneySendingError: null,
      moneySendingInProgress: false,
      moneySendingSuccess: true,
    });
  });

  test('sendMoneyFailed', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, sendMoneyFailed(mockError));
    expect(stateAfter).toEqual({
      ...stateBefore,
      moneySendingError: mockError,
      moneySendingInProgress: false,
    });
  });
});
