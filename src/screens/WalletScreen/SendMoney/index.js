import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert, ScrollView, TouchableOpacity,
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
import { formatETH } from '../../../utils/formatters/amountFormatter';
import Loading from '../../../components/common/Loading';

class SendMoney extends Component {

  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props) {
    super(props);

    this.state = { amountString: '', toEthAddress: '', message: '', fee: 0.5 };
  }

  componentDidUpdate(prevProps) {
    if (this.props.moneySendingError !== prevProps.moneySendingError && this.props.moneySendingError !== null) {
      this._showErrorAlert(this.props.moneySendingError);
    }

    if (this.props.transactionToConfirm !== prevProps.transactionToConfirm && this.props.transactionToConfirm !== null) {
      this._showConfirmationAlert(this.props.transactionToConfirm);
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
    const totalSendAmount = sendAmount + this.state.fee;
    const currentAmount = wallet.balance;

    return sendAmount > 0.00000000000000001
      && totalSendAmount <= currentAmount
      && !_.isEmpty(this.state.toEthAddress);
  }

  onSendPress = () => {
    if (!this._validateSendData()) {
      return;
    }

    const amount = this._parseAmount();
    this.props.onSendMoney(amount, this.state.toEthAddress, this.state.message);
  };

  _showConfirmationAlert(transaction) {
    const amount = formatETH(transaction.value);
    const fee = formatETH(transaction.transactionFee);
    Alert.alert(
      `Sign Transaction`,
      `Send ${amount} (${fee} transaction fee)`,
      [
        { text: 'Cancel', onPress: transaction.abort, style: 'cancel' },
        { text: 'OK', onPress: transaction.confirm },
      ],
      { cancelable: false },
    );
  }

  _showErrorAlert(error) {
    Alert.alert(error.toString());
  }

  render() {
    const wallet = this._resolveWallet();
    if (!wallet) {
      return <View/>;
    }
    const balance = formatETH(
      wallet.balance,
      !wallet.synchronizationError ? 'Updating' : 'Update failed',
      ' available',
    );

    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContentContainer}>

          <View style={styles.fromContainer}>
            <View style={styles.fromTextContainer}>
              <Text style={styles.fromText}>From</Text>
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
              <Text style={styles.amountText}>Amount</Text>
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
              <Text style={styles.amountCurrency}>{wallet.currency}</Text>
            </View>
          </View>


          <View style={styles.toContainer}>
            <View style={styles.toTextContainer}>
              <Text style={styles.toText}>To</Text>
            </View>

            <View style={styles.ethAddressBoxContainer}>
              <TextInput
                style={[styles.baseTextInput, styles.ethTextInput]}
                placeholder='Enter ETH address'
                placeholderTextColor='rgba(255,255,255,0.5)'
                value={this.state.toEthAddress}
                onChangeText={(toEthAddress) => this.setState({ toEthAddress })}
                underlineColorAndroid={Colors.Transparent}
              />
            </View>

            <View style={styles.qrCodeContainer}>
              <TouchableOpacity onPress={this.showQRCodeScanner}>
                <Image
                  style={styles.qrLogo}
                  source={Images.qrColor}
                  resizeMode="cover"/>
              </TouchableOpacity>
            </View>

          </View>


          <View style={styles.noteContainer}>
            <View style={styles.noteTextContainer}>
              <Text style={styles.noteText}>Note</Text>
            </View>

            <View style={styles.noteBoxContainer}>
              <TextInput
                style={[styles.baseTextInput, styles.descriptionTextInput]}
                placeholder='Optional message...'
                placeholderTextColor='rgba(255,255,255,0.5)'
                value={this.state.message}
                onChangeText={(message) => this.setState({ message })}
                underlineColorAndroid={Colors.Transparent}
                multiline={true}
              />
            </View>
          </View>

          <View style={styles.calculatedEmptyContainer}>
            <View style={styles.empty}>
              <Text> </Text>
            </View>

            <View style={styles.calculatedContainer}>
              <View style={styles.sendAmountContainer}>
                <Text style={[styles.calculatedText, { flex: 1 }]}>Send Amount:</Text>
                <Text style={[styles.calculatedText, { fontWeight: 'bold' }]}>{this._parseAmount()}</Text>
                <Text style={[styles.calculatedText, { marginLeft: 8 }]}>{wallet.currency}</Text>
              </View>
              <View style={styles.feeContainer}>
                <Text style={[styles.calculatedText, { flex: 1 }]}>Transfer Fee:</Text>
                <Text style={[styles.calculatedText, { fontWeight: 'bold' }]}>{this.state.fee}</Text>
                <Text style={[styles.calculatedText, { marginLeft: 8 }]}>{wallet.currency}</Text>
              </View>
            </View>
          </View>

          <View style={styles.sendContainer}>
            <Button
              title='Send'
              onPress={this.onSendPress}
              enabled={this._validateSendData()}
              style={styles.sendButton}
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
  onSendMoney(amount, toEthAddress, message) {
    dispatch(sendMoney(amount, toEthAddress, message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);


