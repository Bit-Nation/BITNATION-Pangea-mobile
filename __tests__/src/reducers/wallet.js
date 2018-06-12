// @flow

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
import { servicesDestroyed } from '../../../src/actions/serviceContainer';
import type { WalletType } from '../../../src/types/Wallet';

const mockWallet: WalletType = {
  ethAddress: '0xtestAddress',
  currency: 'ETH',
  balance: null,
  name: 'Test wallet',
};

const mockPATWallet: WalletType = {
  ...mockWallet,
  currency: 'PAT',
};

const mockWallets = [
  mockWallet,
  mockPATWallet,
];

const mockError: Error = new Error('error');

describe('wallet reducer action handling', () => {
  const stateWithWallets = reducer(initialState, walletsListUpdated(mockWallets));

  test('after service destroy returns initial state', () => {
    expect(reducer(stateWithWallets, servicesDestroyed())).toEqual(initialState);
  });

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

  describe('walletSyncFailed', () => {
    test('with wallets', () => {
      const stateBefore = stateWithWallets;
      const stateAfter = reducer(stateBefore, walletSyncFailed(mockWallet.ethAddress, mockWallet.currency, mockError));
      expect(stateAfter).toEqual({
        ...stateBefore,
        ...stateBefore,
        wallets: [
          {
            ...mockWallet,
            synchronizationError: mockError,
          },
          mockPATWallet,
        ],
      });
    });

    test('without wallets', () => {
      const stateBefore = initialState;
      const stateAfter = reducer(stateBefore, walletSyncFailed(mockWallet.ethAddress, mockWallet.currency, mockError));
      expect(stateAfter).toEqual(stateBefore);
    });
  });

  describe('updateWalletBalance', () => {
    test('with wallets', () => {
      const stateBefore = stateWithWallets;
      const stateAfter = reducer(stateBefore, updateWalletBalance(mockWallet.ethAddress, 'ETH'));
      expect(stateAfter).toEqual({
        ...stateBefore,
        wallets: [
          {
            ...mockWallet,
            synchronizationError: undefined,
          },
          mockPATWallet,
        ],
      });
    });

    test('without wallets', () => {
      const stateBefore = initialState;
      const stateAfter = reducer(stateBefore, updateWalletBalance(mockWallet.ethAddress, 'ETH'));
      expect(stateAfter).toEqual(stateBefore);
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
