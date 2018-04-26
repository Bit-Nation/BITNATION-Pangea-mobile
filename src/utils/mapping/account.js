// @flow

import type { Account } from '../../types/Account';
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
    networkType: account.isDevelopment ? 'dev' : 'main',
    avatar: account.profileImage,
    accountStore: account.accountStore,
  };
}
