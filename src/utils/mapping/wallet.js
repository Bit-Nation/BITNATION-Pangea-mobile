// @flow

import type { WalletType } from '../../types/Wallet';
import type { WalletType as DBWallet } from '../../services/database/schemata';

/**
 * @desc Converts Realm object to app-level plain model.
 * @param {WalletType} wallets Realm account object.
 * @return {DBWallet} Converted wallet array object.
 */
export function convertFromDatabase(wallets: DBWallet[]): WalletType[] {
  return [{
    currency: wallets[0].symbol, ethAddress: wallets[0].address, balance: wallets[0].balance === '' ? null : wallets[0].balance, name: wallets[0].name,
  }, {
    currency: wallets[1].symbol, ethAddress: wallets[1].address, balance: wallets[1].balance === '' ? null : wallets[1].balance, name: wallets[1].name,
  }];
}

/**
 * @desc Converts creating wallet to Realm object.
 * @param {WalletType} wallet Wallet to be converted.
 * @param {string} accountId Id of account that wallet is related to.
 * @return {DBWallet} Converted object.
 */
export function convertToDatabase(wallet: WalletType, accountId: string):DBWallet {
  return {
    name: wallet.name,
    chain: 'ethereum',
    symbol: wallet.currency,
    decimals: 18,
    balance: wallet.balance === null ? '' : wallet.balance,
    address: wallet.ethAddress,
    accountId,
    // It's needed because we can have the same address on different accounts in theory later.
    compoundId: `${accountId}|${wallet.ethAddress}|${wallet.currency}`,
  };
}
