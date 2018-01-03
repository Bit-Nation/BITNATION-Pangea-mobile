import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Images from '../../../global/AssetsImages';
import Colors from '../../../global/Colors';
import styles from './styles';
import { Container, Header, Content, Button, StyleProvider } from 'native-base';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import { resolveWallet } from '../../../utils/wallet';

class SendMoney extends Component {

  constructor(props) {
    super(props);

    this.state = { amountString: '', toEthAddress: '', message: '', fee: 0.5 };
  }

  render() {
    const wallet = resolveWallet(this.props.wallets, this.props.selectedWalletAddress);
    if (!wallet) {
      return <View/>;
    }

    console.log(JSON.stringify(wallet));

    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>

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
            <View style={styles.calculatedTextContainer}>
              <Text style={styles.CalculatedText}>Send Amount:</Text>
              <Text style={styles.CalculatedText}>Transfer Fee:</Text>
            </View>

            <View style={styles.calculatedNumberContainer}>
              <Text style={styles.CalculatedText}>{parseFloat(this.state.amountString) || 0}</Text>
              <Text style={styles.CalculatedText}>{this.state.fee}</Text>
            </View>

            <View style={styles.calculatedCurrencyContainer}>
              <Text style={styles.CalculatedText}>{wallet.currency}</Text>
              <Text style={styles.CalculatedText}>{wallet.currency}</Text>
            </View>
          </View>
        </View>

        <View style={styles.nextContainer}>
          <Button style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Button>
        </View>

      </View>
    );
  }

}

SendMoney.propTypes = {};

SendMoney.defaultProps = {};

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);


