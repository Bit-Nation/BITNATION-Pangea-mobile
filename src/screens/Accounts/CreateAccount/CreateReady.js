// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';

import i18n from '../../../global/i18n';
import { screen } from '../../../global/Screens';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import PanelView from '../../../components/common/PanelView';
import ScreenTitle from '../../../components/common/ScreenTitle';
import Button from '../../../components/common/Button';
import styles from '../styles';

type Props = {
	/**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

class AccountReady extends Component<Props> {

  goToDashboard() {

  }

  goToEthWallet() {

  }

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

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AccountReady);
