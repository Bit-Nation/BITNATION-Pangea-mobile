// @flow

import _ from 'lodash';
import type { Account, EditingAccount } from '../types/Account';

/**
 * @desc Function that checks for the save enabled status
 * @param {Account} user User object that is currently saved in the database
 * @param {Account} editingUser User object that is currently being edited
 * @returns {boolean} Save enabled status
 */
export default function saveShouldBeEnabled(user: Account, editingUser: EditingAccount): boolean {
  return !_.isEqual(user, editingUser) && !_.isEmpty(editingUser.name);
}
