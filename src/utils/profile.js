// @flow

import _ from 'lodash';
import type { Props } from '../screens/ProfileScreen/EditProfile';

/**
 * @desc Function that checks for the save enabled status
 * @param {Props} props props that are passed to the component
 * @returns {boolean} Save enabled status
 */
export default function saveShouldBeEnabled(props: Props): boolean {
  return !_.isEqual(props.user, props.editingUser) && !_.isEmpty(props.editingUser.name);
}
