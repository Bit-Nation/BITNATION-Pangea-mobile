import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Images from '../../../global/AssetsImages';
import Colors from '../../../global/Colors';
import styles from './styles';
import Button from '../../../components/Button';
import { Container, Header, Content, StyleProvider } from 'native-base';
import BackgroundImage from '../../../components/BackgroundImage';
import FakeNavigationBar from '../../../components/FakeNavigationBar';
import { resolveWallet } from '../../../utils/wallet';
import { sendMoney } from '../../../actions/wallet';

class SendMoney extends Component {

  constructor(props) {
    super(props);

    this.state = { amountString: '', toEthAddress: '', message: '', fee: 0.5 };
  }

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

    return sendAmount > 0.01 && totalSendAmount <= currentAmount;
  }

  onSendPress = () => {
    if (!this._validateSendData()) {
      return;
    }

    this._showConfirmationAlert();
  };

  _showConfirmationAlert() {
    const wallet = this._resolveWallet();
    const amount = this._parseAmount();
    const currency = wallet.currency;
    const totalAmount = amount + this.state.fee;

    Alert.alert(
      `Send ${amount} ${currency}?`,
      `Send ${amount} ${currency} + fee\nSpend a total of ${totalAmount} ${currency}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => this.props.onSendMoney(wallet, amount, this.state.toEthAddress, this.state.message)
        },
      ],
      { cancelable: true });
  }

  render() {
    const wallet = this._resolveWallet();
    if (!wallet) {
      return <View/>;
    }

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
                <Text style={styles.ethereumNumberContainer}>{`${wallet.balance} ${wallet.currency} available`}</Text>
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
              <Image
                style={styles.qrLogo}
                source={Images.qrColor}
                resizeMode="cover"/>
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
  onSendMoney(wallet, amount, toEthAddress, message) {
    dispatch(sendMoney(wallet, amount, toEthAddress, message));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);


