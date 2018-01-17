import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../../global/Screens';
import Button from '../../../../components/common/Button';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import Text from '../../../../components/common/Text';
import KeyBaseScreen from '../../KeyBaseScreen';
import { KEY_LENGTH } from '../../../../global/Constants';
import { removePrivateKey } from '../../../../actions/key';

class VerifyKeyStep1 extends KeyBaseScreen {

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
            Now that you have written down your private key, we will ask you to verify it.
          </Text>
          <Text messageText style={styles.description}>
            You will type the {KEY_LENGTH} words of your private key into the app, and we will check that your written
            private key
            is correct.
          </Text>
          <Text messageText style={styles.description}>
            Your private key protects everything in Bitnation, so be sure to put your paper with your private key in a
            safe place.
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

VerifyKeyStep1.propTypes = {};

VerifyKeyStep1.defaultProps = {};

const mapStateToProps = state => ({
  ...state.key,
});

const mapDispatchToProps = dispatch => ({
  removePrivateKey(){
    dispatch(removePrivateKey());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKeyStep1);