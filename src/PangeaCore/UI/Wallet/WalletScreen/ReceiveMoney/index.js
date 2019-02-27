// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Share,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import { androidNavigationButtons } from 'pangea-common-reactnative/Screens';
import i18n from 'pangea-common/i18n';
import type { State as WalletState } from '@pangea/wallet/wallet-reducers';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';

class ReceiveMoneyScreen extends Component<WalletState> {
  static navigatorButtons = { ...androidNavigationButtons };

  onShareWalletAddressPress = () => {
    Share.share({
      message: this.props.selectedWalletAddress || '',
    });
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.receiveMoney.title')} />

          <PanelView
            title={i18n.t('screens.receiveMoney.shareAddressPanel.title')}
            body={i18n.t('screens.receiveMoney.shareAddressPanel.text')}
            style={styles.panelViewTransparent}
            renderAdditionalInfo={() =>
              <Text style={styles.addressText}>{this.props.selectedWalletAddress}</Text>
            }
            onButtonClick={this.onShareWalletAddressPress}
            buttonTitle={i18n.t('screens.receiveMoney.shareAddressPanel.button')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveMoneyScreen);
