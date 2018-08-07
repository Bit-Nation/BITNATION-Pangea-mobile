// @flow

import type { Account, PartialAccount, Profile } from '../../types/Account';
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
    confirmedMnemonic: account.confirmedMnemonic,
    lastMigrationVersion: account.lastMigrationVersion,
  };
}

/**
 * @desc Converts creating account to Realm object if it's possible.
 * @param {PartialAccount} account Account to be converted.
 * @param {string} version Version number.
 * @return {?DBAccount} Converted object.
 */
export function convertToDatabase(account: PartialAccount | Account, version: string | null): DBAccount | null {
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
    confirmedMnemonic: typeof (account.confirmedMnemonic) === 'boolean' ? account.confirmedMnemonic : false,
    networkType: account.networkType,
    lastMigrationVersion: version || '0.0.0',
    DHT: [],
  };
}

/**
 * @desc Gets profile information from an account
 * @param {Account} account An account
 * @return {Profile} Retrieved profile information
 */
export function retrieveProfileFromAccount(account: Account): Profile {
  return {
    name: account.name,
    location: account.location,
    avatar: account.avatar,
  };
}

/**
 * @desc Gets profile information from partial account
 * @param {PartialAccount} account An account
 * @return {Profile|null} Retrieved profile information or null if impossible to retrieve
 */
export function retrieveProfileFromPartialAccount(account: PartialAccount): Profile | null {
  if (account.name == null) {
    return null;
  }

  return {
    name: account.name,
    location: account.location,
    avatar: account.avatar,
  };
}
