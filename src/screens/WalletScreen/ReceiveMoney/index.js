import React, { Component } from 'react';
import {
  Text, Image, View, TouchableOpacity, ScrollView, Clipboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import AssetsImages from '../../../global/AssetsImages';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import { resolveWallet } from '../../../utils/wallet';
import Button from '../../../components/common/Button';

class ReceiveMoneyScreen extends Component {

  instruction = 'Send our wallet address and scannable QR code in an email. Do not try to enter this address by hand.';
  instruction2 = 'The sender can scan this QR code with a phone or computer camera to get your wallet address.';
  instruction3 = 'You can copy your wallet address and send any way you choose, e.g. SMS or email. Do not try to type your address by hand!';

  onCopyWalletAddressPress = () => {
    Clipboard.setString(this.props.selectedWalletAddress);
  };

  render() {
    return (
      <ScrollView>
        <BackgroundImage/>
        <FakeNavigationBar/>

        <View style={styles.mainContainer}>
          <View style={styles.panelBox}>
            <Text style={styles.panelHeader}>Scan QR Code</Text>
            <Text style={styles.panelText}>{this.instruction2}</Text>
            <View style={styles.QRCodeContainer}>
              <Image source={AssetsImages.QR} style={styles.QRcode} resizeMode="center"/>
            </View>
          </View>

          <View style={styles.panelBox}>
            <Text style={styles.panelHeader}>Copy Address</Text>
            <Text style={styles.panelText}>{this.instruction3}</Text>

            <Text style={styles.codeText}>{this.props.selectedWalletAddress}</Text>

            <View style={styles.buttonContainer}>
              <Button
                onPress={this.onCopyWalletAddressPress}
                title='Copy Wallet Address'
              />
            </View>
          </View>
        </View>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveMoneyScreen);