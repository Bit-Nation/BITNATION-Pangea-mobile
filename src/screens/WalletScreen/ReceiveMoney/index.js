import React, { Component } from 'react';
import {
  ListView, Text, Image, Button, TextInput,
  View, TouchableOpacityn, Alert, Platform, TouchableOpacity, ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import BackgroundScreen from '../../../components/common/BackgroundImage';
import Header from '../../../components/Header';
import styles from './styles';
import AssetsImages from '../../../global/AssetsImages';

import { Dimensions, } from 'react-native';
import Colors from '../../../global/Colors';

var { height, width } = Dimensions.get('window');


export default class WalletSendAddressScreen extends Component {

  instruction = 'Send our wallet address and scannable QR code in an email. Do not try to enter this address by hand.';
  instruction2 = 'The sender can scan this QR code with a phone or computer camera to get your wallet address.';
  instruction3 = 'You can copy your wallet address and send any way you choose, e.g. SMS or email. Do not try to type your address by hand!';
  code = '0xEfdFc89Eb3630b4d99844126E15a72e685a508';

  render() {
    return (

      <ScrollView>

        <BackgroundScreen/>
        <Header></Header>
        <Text style={styles.header}>Recieve Money</Text>
        <View style={styles.mainContainer}>
          {/* <View style={styles.panelBox}>
                            <Text style={styles.panelHeader}>Send Address by Email</Text>
                            <Text style={styles.panelText}>{this.instruction}</Text>
                            <View stlye={styles.emailTextBox}>
                                <TextInput placeholder="Sender's Email Address" underlineColorAndroid="transparent" placeholderTextColor={Colors.Background} style={styles.emailTextInput}></TextInput>
                            </View>

                            <View style={{marginTop:height*.01, alignItems:'center', width:width,        marginBottom:height*.03,}}>
                                <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onBackButtonPressed()}>
                                    <View style={styles.buttonStyle}>
                                        <Text style={styles.buttonText}>Send Wallet Address</Text>
                                    </View>
                                </TouchableOpacity>                    
                            </View>
                        </View> */}
          <View style={styles.panelBox}>
            <Text style={styles.panelHeader}>Scan QR Code</Text>
            <Text style={styles.panelText}>{this.instruction2}</Text>
            <View style={styles.QRCodeContainer}>
              <Image source={AssetsImages.QR} style={styles.QRcode} resizeMode="center"></Image>
            </View>

          </View>
          <View style={styles.panelBox}>
            <Text style={styles.panelHeader}>Copy Address</Text>
            <Text style={styles.panelText}>{this.instruction3}</Text>

            <Text style={styles.codeText}>{this.code}</Text>

            <View style={{ marginTop: height * .01, alignItems: 'center', width: width, marginBottom: height * .03, }}>
              <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onBackButtonPressed()}>
                <View style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>Copy Wallet Address</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}