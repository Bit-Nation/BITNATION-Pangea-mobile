import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Images from '../../../global/AssetsImages';
import Colors from '../../../global/Colors';
import styles from './styles';
import Button from '../../../components/common/Button';
import { Container, Header, Content, StyleProvider } from 'native-base';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import { resolveWallet } from '../../../utils/wallet';
import { sendMoney } from '../../../actions/wallet';
import { androidNavigationButtons, screen } from '../../../global/Screens';
import Loading from '../../../components/common/Loading';
import { prettyETHWalletBalance } from '../../../utils/formatters';
import i18n from '../../../global/i18n';

class SendMoney extends Component {

  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props) {
    super(props);

    this.state = { amountString: '', toEthAddress: '' };
  }

  componentDidUpdate(prevProps) {
    if (this.props.moneySendingError !== prevProps.moneySendingError && this.props.moneySendingError !== null) {
      this._showErrorAlert(this.props.moneySendingError);
    }
  }

  showQRCodeScanner = () => {
    this.props.navigator.showModal({
      ...screen('QR_CODE_SCANNER_SCREEN'),
      passProps: {
        onReadCode: this._onReadCode,
      },
    });
  };

  _onReadCode = (event) => {
    this.props.navigator.dismissModal();
    this.setState({ toEthAddress: event.data });
  };

  _resolveWallet() {
    return resolveWallet(this.props.wallets, this.props.selectedWalletAddress);
  }

  _parseAmount() {
    return parseFloat(this.state.amountString) || 0;
  }

  _validateSendData() {
    const wallet = this._resolveWallet();
    const sendAmount = this._parseAmount();
    const currentAmount = wallet.balance;

    return sendAmount > 0.00000000000000001
      && sendAmount <= currentAmount
      && !_.isEmpty(this.state.toEthAddress);
  }

  onSendPress = () => {
    if (!this._validateSendData()) {
      return;
    }

    const amount = this._parseAmount();
    this.props.onSendMoney(amount, this.state.toEthAddress);
  };

  _showErrorAlert(error) {
    Alert.alert(error.toString());
  }

  render() {
    const wallet = this._resolveWallet();
    if (!wallet) {
      return <View/>;
    }

    const balance = prettyETHWalletBalance(wallet, ' ' + i18n.t('screens.sendMoney.available'));

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView contentContainerStyle={styles.bodyContainer}>

          <View style={styles.fromContainer}>
            <View style={styles.fromTextContainer}>
              <Text style={styles.body}>{i18n.t('common.from')}</Text>
            </View>

            <View style={styles.ethereumContainer}>
              <View style={styles.ethereumLogoContainer}>
                <Image
                  style={styles.ethereumLogo}
                  source={Images.eth}
                  resizeMode="contain"/>
              </View>

              <View style={styles.ethereumDetailsContainer}>
                <Text style={styles.ethereumTextContainer}>{wallet.name}</Text>
                <Text style={styles.ethereumNumberContainer}>{balance}</Text>
              </View>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <View style={styles.amountTextContainer}>
              <Text style={styles.body}>{i18n.t('common.amount')}</Text>
            </View>

            <View style={styles.amountBoxContainer}>
              <TextInput
                style={[styles.baseTextInput, styles.amountTextInput]}
                placeholder='1.02'
                placeholderTextColor='rgba(255,255,255,0.5)'
                value={this.state.amountString}
                onChangeText={(amountString) => this.setState({ amountString })}
                underlineColorAndroid={Colors.Transparent}
                keyboardType='numeric'
              />
            </View>

            <View style={styles.amountCurrencyContainer}>
              <Text style={styles.body}>{wallet.currency}</Text>
            </View>
          </View>


          <View style={styles.toContainer}>
            <View style={styles.toTextContainer}>
              <Text style={styles.body}>{i18n.t('common.to')}</Text>
            </View>

            <View style={styles.ethAddressBoxContainer}>
              <TextInput
                style={[styles.baseTextInput, styles.ethTextInput]}
                placeholder={i18n.t('screens.sendMoney.enterAddress')}
                placeholderTextColor='rgba(255,255,255,0.5)'
                value={this.state.toEthAddress}
                onChangeText={(toEthAddress) => this.setState({ toEthAddress })}
                underlineColorAndroid={Colors.Transparent}
              />
            </View>

          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t('common.send')}
              onPress={this.onSendPress}
              enabled={this._validateSendData()}
              style={styles.button}
            />
          </View>

        </ScrollView>
        {this.props.moneySendingInProgress ? <Loading/> : null}
      </View>
    );
  }

}

SendMoney.propTypes = {};

SendMoney.defaultProps = {};

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({
  onSendMoney(amount, toEthAddress) {
    dispatch(sendMoney(amount, toEthAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);


