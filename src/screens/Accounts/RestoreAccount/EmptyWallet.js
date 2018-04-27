// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import i18n from '../../../global/i18n';
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

class EmptyWallet extends Component<Props> {

  nextStep() {

  }

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.screenContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.restore.title')} />
          <View style={styles.bodyContainer}>
            <Text style={styles.body}>
              {i18n.t('screens.accounts.restore.emptyWalletStatement')}
            </Text>
            <Text style={[styles.body, styles.mt30]}>
              {i18n.t('screens.accounts.restore.sendETH')}
            </Text>
          </View>
          <View style={styles.bottomSpacer}>
            <Button
              style={[styles.panelButton, styles.baseButton]}
              title={i18n.t('screens.accounts.create.next')}
              onPress={this.nextStep}
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

export default connect(mapStateToProps, mapDispatchToProps)(EmptyWallet);
