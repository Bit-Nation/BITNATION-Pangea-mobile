import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../global/Screens';
import Button from '../../../components/common/Button';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import Text from '../../../components/common/Text';
import KeyBaseScreen from '../KeyBaseScreen';
import { removePrivateKey } from '../../../actions/key';

class LoadWalletScreen extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.navigator.push(screen('VERIFY_KEY_SCREEN_STEP_2'));
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>

        <View style={styles.wholeText}>
          <Text messageText style={styles.description}>
            If you have a private key from another Bitnation wallet, you can use it here to add that wallet to this app.
          </Text>
          <Text messageText style={styles.description}>
            For example, if you lost or upgraded your device, you will have to transfer wallets from that device to this
            one.
          </Text>
          <Text messageText style={styles.description}>
            To load your wallet, we will ask you for the 12 words of your private key. You should have these on a piece
            of paper you store in a safe and secure place.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title='Begin'
                  onPress={() => this.onNextButtonPressed()}/>
        </View>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadWalletScreen);