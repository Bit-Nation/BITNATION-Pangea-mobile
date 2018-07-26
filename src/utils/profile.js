// @flow

import _ from 'lodash';
import type { Account, PartialAccount } from '../types/Account';

/**
 * @desc Function that checks for the save enabled status
 * @param {Account} account Account object that is currently saved in the database
 * @param {Account} editingAccount Account object that is currently being edited
 * @returns {boolean} Save enabled status
 */
export function saveShouldBeEnabled(account: Account | PartialAccount, editingAccount: Account | PartialAccount): boolean {
  return !_.isEqual(account, editingAccount) && !_.isEmpty(editingAccount.name);
}

/**
 * @desc Return valid image source for base64 encoded image.
 * @param {?string} base64Avatar Base64 encoded image.
 * @return {Object} Source to pass into Image component or null for placeholder.
 */
export function imageSource(base64Avatar: ?string): ?Object {
  return base64Avatar != null && base64Avatar.length > 0
    ? { uri: `data:image/gif;base64,${base64Avatar}` }
    : null;
}
