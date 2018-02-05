import React, { Component } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../../global/Screens';
import Button from '../../../../components/common/Button';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import KeyBaseScreen from '../../KeyBaseScreen';
import { KEY_LENGTH } from '../../../../global/Constants';
import { changeEnteredMnemonic, removePrivateKey } from '../../../../actions/key';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';

const paragraphs = [
  'Now that you have written down your private key, we will ask you to verify it.',
  `You will type the ${KEY_LENGTH} words of your private key into the app, and we will check that your written private key is correct.`,
  'Your private key protects everything in Bitnation, so be sure to put your paper with your private key in a safe place.',
];

class VerifyKeyInstructionScreen extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.navigator.push(screen('VERIFY_KEY_PROCESS_SCREEN'));
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>

        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <BodyParagraphs paragraphs={paragraphs}/>
          <View style={styles.buttonContainer}>
            <Button title='Begin'
                    onPress={() => this.onNextButtonPressed()}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

VerifyKeyInstructionScreen.propTypes = {};

VerifyKeyInstructionScreen.defaultProps = {};

const mapStateToProps = state => ({
  ...state.key,
});

const mapDispatchToProps = dispatch => ({
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
  changeMnemonic(mnemonic) {
    dispatch(changeEnteredMnemonic(mnemonic));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKeyInstructionScreen);