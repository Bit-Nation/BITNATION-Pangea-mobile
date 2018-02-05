import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../global/Screens';
import Button from '../../../components/common/Button';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import KeyBaseScreen from '../KeyBaseScreen';
import { changeEnteredMnemonic, removePrivateKey } from '../../../actions/key';
import { KEY_LENGTH } from '../../../global/Constants';
import BodyParagraphs from '../../../components/common/BodyParagraphs';

const paragraphs = [
  'If you have a private key from another Bitnation wallet, you can use it here to add that wallet to this app.',
  'For example, if you lost or upgraded your device, you will have to transfer wallets from that device to this one.',
  `To load your wallet, we will ask you for the ${KEY_LENGTH} words of your private key. You should have these on a piece of paper you store in a safe and secure place.`,
];

class LoadWalletScreen extends KeyBaseScreen {

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

LoadWalletScreen.propTypes = {};

LoadWalletScreen.defaultProps = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(LoadWalletScreen);