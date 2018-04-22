// @flow

import React from 'react';
import {
  Image,
  View,
  Text,
  Alert,
} from 'react-native';

import styles from './styles';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import type { Account } from '../../../types/Account';
import i18n from '../../../global/i18n';
import { androidNavigationButtons } from '../../../global/Screens';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Current user object
   */
  user: Account,
};

class ProfileScreen extends NavigatorComponent<Props> {

  static navigatorButtons = { ...androidNavigationButtons };

  onNavBarButtonPress(id: string): void {
    if (id === 'cancel') {
      this.props.navigator.pop();
    }
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        {/* TITLE OF SCREEN */}
        <View style={styles.titleContainer}>
          <View style={styles.titleBarLarge}>
            <Text style={styles.largeTitle}>{i18n.t('screens.profile.title')}</Text>
          </View>
        </View>

      </View>
    );
  }
}

export default ProfileScreen;
