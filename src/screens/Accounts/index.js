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
import { startAccountCreation } from '../../actions/accounts';
import { type State as AccountsState } from '../../reducers/accounts';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type Actions = {
  /**
   * @desc Action to start account process.
   */
  startAccountCreation: () => void,
}

class Accounts extends NavigatorComponent<Props & Actions & AccountsState> {
  onCreateAccount = () => {
    this.props.startAccountCreation();
    this.props.navigator.push({
      ...screen('SECURITY_SETTINGS_SCREEN'),
      passProps: {
        isCreating: true,
      },
    });
  };

  onRestoreAccount = () => {
    this.props.navigator.push(screen('ACCOUNT_RESTORE_SOURCE'));
  };

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyAccountContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.title')} />
          <PanelView body={i18n.t('screens.accounts.introduction')} />
          <View style={{}}>
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.newAccount')}
              onPress={this.onCreateAccount}
            />
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.restoreAccount')}
              onPress={this.onRestoreAccount}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.accounts,
});

const mapDispatchToProps = dispatch => ({
  startAccountCreation() {
    dispatch(startAccountCreation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
