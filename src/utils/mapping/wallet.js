// @flow

import type { WalletType } from '../../types/Wallet';
import type { WalletType as DBWallet } from '../../services/database/schemata';

/**
 * @desc Converts Realm object to app-level plain model.
 * @param {WalletType} wallet Realm wallet object.
 * @return {DBWallet} Converted wallet object.
 */
export function convertFromDatabase(wallet: DBWallet): WalletType {
  return {
    currency: wallet.symbol === 'PAT' ? 'XPAT' : wallet.symbol,
    ethAddress: wallet.address,
    balance: wallet.balance === '' ? null : wallet.balance,
    name: wallet.name,
  };
}

/**
 * @desc Converts creating wallet to Realm object.
 * @param {WalletType} wallet Wallet to be converted.
 * @param {string} accountId Id of account that wallet is related to.
 * @return {DBWallet} Converted object.
 */
export function convertToDatabase(wallet: WalletType, accountId: string):DBWallet {
  const convertedCurrency = wallet.currency === 'XPAT' ? 'PAT' : wallet.currency;

  return {
    name: wallet.name,
    chain: 'ethereum',
    symbol: convertedCurrency,
    decimals: 18,
    balance: wallet.balance === null ? '' : wallet.balance,
    address: wallet.ethAddress,
    accountId,
    // It's needed because we can have the same address on different accounts in theory later.
    compoundId: `${accountId}|${wallet.ethAddress}|${convertedCurrency}`,
  };
}
