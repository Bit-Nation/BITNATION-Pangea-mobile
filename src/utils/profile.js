// @flow

import _ from 'lodash';
import type { ProfileType } from '../types/Profile';

/**
 * @desc Function that checks for the save enabled status
 * @param {ProfileType} user User object that is currently saved in the database
 * @param {ProfileType} editingUser User object that is currently being edited
 * @returns {boolean} Save enabled status
 */
export default function saveShouldBeEnabled(user: ProfileType, editingUser: ProfileType): boolean {
  return !_.isEqual(user, editingUser) && !_.isEmpty(editingUser.name);
}
