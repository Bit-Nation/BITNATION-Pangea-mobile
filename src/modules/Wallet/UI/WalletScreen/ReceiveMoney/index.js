// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Share,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import PanelView from '../../../components/common/PanelView';
import { androidNavigationButtons } from '../../../global/Screens';
import i18n from '../../../global/i18n';
import type { State as WalletState } from '../../../reducers/wallet';
import ScreenTitle from '../../../components/common/ScreenTitle';

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
