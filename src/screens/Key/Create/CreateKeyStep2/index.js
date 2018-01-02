import React, { Component } from 'react';
import {
  ListView, Text, Image, Button,
  View, TouchableOpacity, Alert, Platform
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import PrivateKeyRow from '../../../../components/PrivateKeyRow';
import BackgroundScreen from '../../../../components/BackgroundScreen';
import Header from '../../../../components/Header';
import { Dialog } from 'react-native-simple-dialogs';

import { Dimensions, } from 'react-native';
import Colors from '../../../../global/Colors';
import Screens from '../../../../global/Screens';

var { height, width } = Dimensions.get('window');

export default class CreateKeyStep2 extends Component {

  instruction = 'We will show you a group of 12 words that is the private key that unlocks your wallet.';
  instructionDetails = 'Write the words on paper, in order. Store the paper in very safe place. If your device is lost, stolen, broken, or upgraded, you must have this key to restore or unlock your wallet.';

  onNextButtonPressed() {
    this.props.navigator.push(Screens.CREATE_KEY_SCREEN_STEP_3);
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundScreen></BackgroundScreen>
        <Header headerTitle="Create Private Key" onLeftButtonPress={() => this.onCancelButtonPressed()}
                onRightButtonPress={() => this.onNextButtonPressed()}></Header>
        <View style={styles.instructionBox}>
          <Text style={styles.instructionBoxText}>{this.instruction}</Text>
        </View>
        <View style={styles.panel}>
          <PrivateKeyRow firstIndex={1} values={['word', 'word', 'word']}></PrivateKeyRow>
          <PrivateKeyRow firstIndex={4} values={['word', 'word', 'word']}></PrivateKeyRow>
          <PrivateKeyRow firstIndex={7} values={['word', 'word', 'word']}></PrivateKeyRow>
          <PrivateKeyRow firstIndex={10} values={['word', 'word', 'word']}></PrivateKeyRow>
        </View>
        <View style={{ marginTop: height * .05, width: width }}>
          <View style={{ alignItems: 'center' }}>

            <View style={styles.instructionDetailsBox}>
              <Text style={styles.instructionBoxText}>{this.instructionDetails}</Text>
            </View>

            <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onNextButtonPressed()}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
