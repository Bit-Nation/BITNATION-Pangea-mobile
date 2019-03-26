// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import i18n from 'pangea-common/i18n';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import styles from '../styles';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import { performDeferredLogin } from '@pangea/accounts/accounts-actions';
import { type State as AccountsState } from '@pangea/accounts/accounts-reducers';
import { saveSettings } from '@pangea/settings/settings-actions';
import Loading from 'pangea-common-reactnative/UI/Loading';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Performs login that was deferred on account creation process.
   */
  performDeferredLogin: () => void,
  /**
   * @des Saves current settings into database related to specified account id.
   * @param {string} accountId Id of corresponding account.
   * @param {function} callback Function that is called when operation is finished.
   */
  saveSettings: (accountId: string, callback: () => void) => void,
};

class AccountReady extends Component<Props & AccountsState> {
  goToDashboard = () => {
    if (this.props.creatingAccount !== null) {
      this.props.saveSettings(this.props.creatingAccount.id, () => {
        this.props.performDeferredLogin();
      });
    }
  };

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.create.title')} />
          <View style={styles.bodyContainer}>
            <PanelView body={i18n.t('screens.accounts.create.readyUse')} />
            <Button
              transparent
              style={styles.panelButton}
              onPress={this.goToDashboard}
            >
              <Text style={styles.prevText}>
                {i18n.t('screens.accounts.create.openDashboard')}
              </Text>
            </Button>
          </View>
        </View>
        {this.props.login.inProgress === true && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.accounts,
});

const mapDispatchToProps = dispatch => ({
  performDeferredLogin() {
    dispatch(performDeferredLogin());
  },
  saveSettings(accountId, callback) {
    dispatch(saveSettings(accountId, callback));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountReady);
