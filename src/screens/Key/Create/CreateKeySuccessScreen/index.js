import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import Button from '../../../../components/common/Button';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import Text from '../../../../components/common/Text';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import KeyBaseScreen from '../../KeyBaseScreen/index';
import { screen } from '../../../../global/Screens';
import { removePrivateKey } from '../../../../actions/key';

class CreateKeySuccessScreen extends KeyBaseScreen {

  onStartVerifyPress = () => {
    this.props.navigator.push(screen('VERIFY_KEY_INSTRUCTION_SCREEN'));
  };

  render() {
    return (

      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>

        <View style={styles.wholeText}>
          <Text messageText style={styles.description}>
            Congratulations, you now have a private key.
          </Text>
          <Text messageText style={styles.description}>
            Remember, your private key is the only way to restore your wallet. If your phone is lost, stolen, broken, or
            upgraded, you must have a copy of private key, or you will lose all your money!
          </Text>
          <Text messageText style={[styles.description, styles.applyBold]}>
            Put your paper with your private key in a safe place.
          </Text>
          <Text messageText style={styles.description}>
            Next, you must verify that you wrote your private key correctly by entering the words.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title='Begin'
                  onPress={this.onStartVerifyPress}/>
        </View>

      </View>
    );
  }
}

CreateKeySuccessScreen.propTypes = {};

CreateKeySuccessScreen.defaultProps = {};

const mapStateToProps = state => ({
  ...state.key,
});

const mapDispatchToProps = dispatch => ({
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeySuccessScreen);