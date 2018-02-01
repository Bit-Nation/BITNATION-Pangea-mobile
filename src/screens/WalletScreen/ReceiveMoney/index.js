import React, { Component } from 'react';
import {
  Text, Image, View, TouchableOpacity, ScrollView, Clipboard, Share,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';

import styles from './styles';
import AssetsImages from '../../../global/assetsImages';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import { resolveWallet } from '../../../utils/wallet';
import Button from '../../../components/common/Button';
import MessageView from '../../../components/common/MessageView';
import { androidNavigationButtons } from '../../../global/Screens';

class ReceiveMoneyScreen extends Component {

  static navigatorButtons = { ...androidNavigationButtons };

  qrCodeText = 'The sender can scan this QR code with a phone or computer camera to get your wallet address.';
  copyAddressText = 'You can copy your wallet address and send any way you choose, e.g. SMS or email. Do not try to type your address by hand!';

  onShareWalletAddressPress = () => {
    Share.share({
      message: this.props.selectedWalletAddress,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView style={styles.mainContainer} contentContainerStyle={styles.scrollViewContentContainer}>
          <MessageView
            title='Copy Address'
            messageText={this.copyAddressText}
            style={[styles.messageView]}
            renderAdditionalInfo={() =>
              <Text style={styles.codeText}>{this.props.selectedWalletAddress}</Text>
            }
            onButtonClick={this.onShareWalletAddressPress}
            buttonTitle='Share Wallet Address'/>
        </ScrollView>

      </View>
    )
      ;
  }
}

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveMoneyScreen);