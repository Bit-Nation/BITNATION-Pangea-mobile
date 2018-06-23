// @flow

import _ from 'lodash';
import type { Account, PartialAccount } from '../types/Account';

/**
 * @desc Function that checks for the save enabled status
 * @param {Account} account Account object that is currently saved in the database
 * @param {Account} editingAccount Account object that is currently being edited
 * @returns {boolean} Save enabled status
 */
export default function saveShouldBeEnabled(account: Account | PartialAccount, editingAccount: Account | PartialAccount): boolean {
  return !_.isEqual(account, editingAccount) && !_.isEmpty(editingAccount.name);
}
