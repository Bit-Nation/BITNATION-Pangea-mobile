import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Share,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';

import styles from './styles';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import PanelView from '../../../components/common/PanelView';
import { androidNavigationButtons } from '../../../global/Screens';
import i18n from '../../../global/i18n';

class ReceiveMoneyScreen extends Component {

  static navigatorButtons = { ...androidNavigationButtons };

  onShareWalletAddressPress = () => {
    Share.share({
      message: this.props.selectedWalletAddress,
    });
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <PanelView
            title={i18n.t('screens.receiveMoney.shareAddressPanel.title')}
            body={i18n.t('screens.receiveMoney.shareAddressPanel.text')}
            style={[styles.messageView]}
            renderAdditionalInfo={() =>
              <Text style={styles.codeText}>{this.props.selectedWalletAddress}</Text>
            }
            onButtonClick={this.onShareWalletAddressPress}
            buttonTitle={i18n.t('screens.receiveMoney.shareAddressPanel.button')}/>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveMoneyScreen);