// @flow

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import type { Account } from '../../../types/Account';
import i18n from '../../../global/i18n';
import { androidNavigationButtons } from '../../../global/Screens';
import ScreenTitle from '../../../components/common/ScreenTitle';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';

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
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.securitySettings.title')} />
        <View style={styles.bodyContainer}>

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
