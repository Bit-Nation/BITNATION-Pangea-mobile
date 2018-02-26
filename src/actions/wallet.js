// @flow

import type { WalletType } from '../types/Wallet';

type SelectWalletAction = { +type: 'SELECT_WALLET', +wallet: WalletType };
type SendMoneyAction = { +type: 'SEND_MONEY', +amount: number, +toEthAddress: string };
type WalletListUpdatedAction = { +type: 'WALLETS_LIST_UPDATED', +wallets: Array<WalletType> };
type UpdateWalletListAction = { +type: 'UPDATE_WALLET_LIST' };
type UpdateWalletBalanceAction = { +type: 'UPDATE_WALLET_BALANCE', +walletAddress: string };
type SendMoneySuccessAction = { +type: 'SEND_MONEY_SUCCESS' };
type SendMoneyFailedAction = { +type: 'SEND_MONEY_FAILED', +error: Error };
type WalletSyncFailedAction = { +type: 'WALLET_SYNC_FAILED', +walletAddress: string, +error: Error };

export type Action =
  | SelectWalletAction
  | SendMoneyAction
  | WalletListUpdatedAction
  | UpdateWalletListAction
  | UpdateWalletBalanceAction
  | SendMoneySuccessAction
  | SendMoneyFailedAction
  | WalletSyncFailedAction;

export const SELECT_WALLET = 'SELECT_WALLET';
export const SEND_MONEY = 'SEND_MONEY';
export const SEND_MONEY_SUCCESS = 'SEND_MONEY_SUCCESS';
export const SEND_MONEY_FAILED = 'SEND_MONEY_FAILED';
export const WALLETS_LIST_UPDATED = 'WALLETS_LIST_UPDATED';
export const WALLET_SYNC_FAILED = 'WALLET_SYNC_FAILED';
export const UPDATE_WALLET_LIST = 'UPDATE_WALLET_LIST';
export const UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE';

/**
 * @desc Action creator for an action that select a wallet to be currently active.
 * @param {WalletType} wallet Wallet to select.
 * @returns {SelectWalletAction} An action.
 */
export function selectWallet(wallet: WalletType): SelectWalletAction {
  return {
    type: SELECT_WALLET,
    wallet,
  };
}

/**
 * @desc Action creator for an action that sends money.
 * @param {number} amount Amount to send in eth.
 * @param {string} toEthAddress Address to send money.
 * @returns {SendMoneyAction} An action.
 */
export function sendMoney(amount: number, toEthAddress: string): SendMoneyAction {
  return {
    type: SEND_MONEY,
    amount,
    toEthAddress,
  };
}

/**
 * @desc Action creator for an action that takes update of wallets available.
 * @param {WalletType[]} wallets Array of wallets.
 * @returns {WalletListUpdatedAction} An action.
 */
export function walletsListUpdated(wallets: Array<WalletType>): WalletListUpdatedAction {
  return {
    type: WALLETS_LIST_UPDATED,
    wallets,
  };
}

/**
 * @desc Action creator for an action that starts wallets list update.
 * @returns {UpdateWalletListAction} An action.
 */
export function updateWalletList(): UpdateWalletListAction {
  return {
    type: UPDATE_WALLET_LIST,
  };
}

/**
 * @desc Action creator for an action that starts specific wallet update.
 * @param {string} walletAddress Address of wallet to update.
 * @returns {UpdateWalletBalanceAction} An action.
 */
export function updateWalletBalance(walletAddress: string): UpdateWalletBalanceAction {
  return {
    type: UPDATE_WALLET_BALANCE,
    walletAddress,
  };
}

/**
 * @desc Action creator for an action that should be called on send money success.
 * @returns {SendMoneySuccessAction} An action.
 */
export function sendMoneySuccess(): SendMoneySuccessAction {
  return {
    type: SEND_MONEY_SUCCESS,
  };
}

/**
 * @desc Action creator for an action that should be called on send money failed.
 * @param {Error} error An error that occurs.
 * @returns {SendMoneyFailedAction} An action.
 */
export function sendMoneyFailed(error: Error): SendMoneyFailedAction {
  return {
    type: SEND_MONEY_FAILED,
    error,
  };
}

/**
 * @desc Action creator for an action that should be called on wallet synchronization fail.
 * @param {string} walletAddress Address of wallet that was synced.
 * @param {Error} error An error that occurs.
 * @returns {WalletSyncFailedAction} An action.
 */
export function walletSyncFailed(walletAddress: string, error: Error): WalletSyncFailedAction {
  return {
    type: WALLET_SYNC_FAILED,
    walletAddress,
    error,
  };
}
