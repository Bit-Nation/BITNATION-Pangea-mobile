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
 * @param {?string} base64Image Base64 encoded image.
 * @param {string} mimeType Mime type of the image.
 * @return {Object} Source to pass into Image component or null for placeholder.
 */
export function imageSource(base64Image: ?string, mimeType: string = 'image/jpg'): ?Object {
  return base64Image != null && base64Image.length > 0
    ? { uri: `data:${mimeType};base64,${base64Image}` }
    : null;
}
