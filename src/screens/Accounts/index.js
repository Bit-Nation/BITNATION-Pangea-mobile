// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import i18n from '../../global/i18n';
import { screen } from '../../global/Screens';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import PanelView from '../../components/common/PanelView';
import ScreenTitle from '../../components/common/ScreenTitle';
import Button from '../../components/common/Button';
import type { Navigator } from '../../types/ReactNativeNavigation';
import styles from './styles';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

class Accounts extends NavigatorComponent<Props> {
  onCreateAccount: Function;
  onRestoreAccount: Function;

  constructor(props: Props) {
    super(props);
    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.onRestoreAccount = this.onRestoreAccount.bind(this);
  }

  onCreateAccount() {
    this.props.navigator.push({
      ...screen('SECURITY_SETTINGS_SCREEN'),
      passProps: {
        isCreating: true,
      },
    });
  }

  onRestoreAccount() {
    this.props.navigator.push({
      ...screen('ENTER_PASSCODE_SCREEN'),
      passProps: {
        onSuccess: () => {
          this.props.navigator.push(screen('ACCOUNT_RESTORE_SOURCE'));
        },
      },
    });
  }

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.screenContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.title')} />
          <PanelView body={i18n.t('screens.accounts.introduction')} />
          <View style={{}}>
            <Button
              style={styles.panelButton}
              title='New Account'
              onPress={this.onCreateAccount}
            />
            <Button
              style={styles.panelButton}
              title='Restore Account'
              onPress={this.onRestoreAccount}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
