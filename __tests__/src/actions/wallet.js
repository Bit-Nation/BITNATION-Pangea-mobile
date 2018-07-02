// @flow

import {
  SELECT_WALLET,
  SEND_MONEY,
  SEND_MONEY_FAILED,
  SEND_MONEY_SUCCESS,
  UPDATE_WALLET_BALANCE,
  UPDATE_WALLET_LIST,
  WALLET_SYNC_FAILED,
  WALLETS_LIST_UPDATED,
  selectWallet,
  sendMoney,
  sendMoneyFailed,
  sendMoneySuccess,
  updateWalletBalance,
  updateWalletList,
  walletsListUpdated, walletSyncFailed,
} from '../../../src/actions/wallet';

describe('wallet action creators', () => {
  const mockAddress = '0xtestaddress';
  const mockWallet = {
    ethAddress: mockAddress,
    currency: 'ETH',
    balance: '0.42',
    name: 'Test wallet name',
  };
  const mockWallets = [{ ...mockWallet }, { ...mockWallet }];
  const mockError = new Error('ERROR');

  test('selectWallet', () => {
    expect(selectWallet(mockWallet)).toEqual({
      type: SELECT_WALLET,
      wallet: mockWallet,
    });
  });
  test('sendMoney', () => {
    expect(sendMoney(0.5, mockAddress)).toEqual({
      type: SEND_MONEY,
      amount: 0.5,
      toEthAddress: mockAddress,
    });
  });
  test('walletsListUpdated', () => {
    expect(walletsListUpdated(mockWallets, true)).toEqual({
      type: WALLETS_LIST_UPDATED,
      wallets: mockWallets,
      syncDone: true,
    });
  });
  test('updateWalletList', () => {
    expect(updateWalletList()).toEqual({
      type: UPDATE_WALLET_LIST,
    });
  });
  test('updateWalletBalance', () => {
    expect(updateWalletBalance(mockAddress, 'ETH')).toEqual({
      type: UPDATE_WALLET_BALANCE,
      walletAddress: mockAddress,
      walletCurrency: 'ETH',
    });
  });
  test('sendMoneySuccess', () => {
    expect(sendMoneySuccess()).toEqual({
      type: SEND_MONEY_SUCCESS,
    });
  });
  test('sendMoneyFailed', () => {
    expect(sendMoneyFailed(mockError)).toEqual({
      type: SEND_MONEY_FAILED,
      error: mockError,
    });
  });
  test('walletSyncFailed', () => {
    expect(walletSyncFailed(mockAddress, 'XPAT', mockError)).toEqual({
      type: WALLET_SYNC_FAILED,
      walletAddress: mockAddress,
      walletCurrency: 'XPAT',
      error: mockError,
    });
  });
});
