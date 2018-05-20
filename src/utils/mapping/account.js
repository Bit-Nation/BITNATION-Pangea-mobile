// @flow

import type { Account, PartialAccount } from '../../types/Account';
import { type AccountType as DBAccount } from '../../services/database/schemata';

/**
 * @desc Converts Realm object to app-level plain model.
 * @param {AccountType} account Realm account object.
 * @return {Account} Converted account object.
 */
export function convertFromDatabase(account: DBAccount): Account {
  return {
    id: account.id,
    name: account.name,
    location: account.location,
    networkType: account.networkType,
    avatar: account.profileImage,
    accountStore: account.accountStore,
  };
}

/**
 * @desc Converts creating account to Realm object if it's possible.
 * @param {PartialAccount} account Account to be converted.
 * @return {?DBAccount} Converted object.
 */
export function convertToDatabase(account: PartialAccount | Account): DBAccount | null {
  if (account.name == null || account.accountStore == null) {
    return null;
  }

  return {
    id: account.id,
    name: account.name,
    location: account.location || '',
    description: '',
    profileImage: account.avatar || '',
    accountStore: account.accountStore,
    confirmedMnemonic: false,
    networkType: account.networkType,
    DHT: [],
  };
}
