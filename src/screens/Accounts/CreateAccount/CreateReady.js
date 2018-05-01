// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import i18n from '../../../global/i18n';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import PanelView from '../../../components/common/PanelView';
import ScreenTitle from '../../../components/common/ScreenTitle';
import Button from '../../../components/common/Button';
import styles from '../styles';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import { performDeferredLogin } from '../../../actions/accounts';
import { type State as AccountsState } from '../../../reducers/accounts';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Performs login that was deferred on account creation process.
   */
  performDeferredLogin: () => void,
};

class AccountReady extends Component<Props & AccountsState> {
  goToDashboard = () => {
    if (this.props.creatingAccount !== null) {
      this.props.performDeferredLogin();
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
              style={styles.panelButton}
              title={i18n.t('screens.accounts.create.openDashboard')}
              onPress={this.goToDashboard}
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
  performDeferredLogin() {
    dispatch(performDeferredLogin());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountReady);
