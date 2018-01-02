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

class SendMoney extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '1.02', ethAddress: 'Enter ETH Address', description: '' };
  }

  render() {
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
              <Text style={styles.ethereumTextContainer}>Ethereum</Text>
              <Text style={styles.ethereumNumberContainer}>1.7534 ETH available</Text>
            </View>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <View style={styles.amountTextContainer}>
            <Text style={styles.amountText}>Amount</Text>
          </View>

          <View style={styles.amountBoxContainer}>
            <TextInput
              style={styles.amountTextInput}
              value={this.state.text}
              onChangeText={(text) => this.setState({ text })}
              underlineColorAndroid={Colors.Transparent}
            />
          </View>

          <View style={styles.amountCurrencyContainer}>
            <Text style={styles.amountCurrency}>ETH </Text>
          </View>
        </View>


        <View style={styles.toContainer}>
          <View style={styles.toTextContainer}>
            <Text style={styles.toText}>To</Text>
          </View>

          <View style={styles.ethAddressBoxContainer}>
            <TextInput
              style={styles.ethTextInput}
              placeholder='Enter ETH Address'
              placeholderTextColor='white'
              onChangeText={(ethAddress) => this.setState({ ethAddress })}
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
              style={styles.descriptionTextInput}
              placeholder='Optional Message'
              placeholderTextColor='white'
              onChangeText={(ethAddress) => this.setState({ ethAddress })}
              underlineColorAndroid={Colors.Transparent}
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
              <Text style={styles.CalculatedText}>1.020000</Text>
              <Text style={styles.CalculatedText}>0.050000</Text>
            </View>

            <View style={styles.calculatedCurrencyContainer}>
              <Text style={styles.CalculatedText}>ETH</Text>
              <Text style={styles.CalculatedText}>ETH</Text>
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
  ...state,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);


