import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import Colors from '../../../../global/Colors';
import { screen } from '../../../../global/Screens';
import Button from '../../../../components/common/Button';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import Text from '../../../../components/common/Text';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import KeyBaseScreen from '../../KeyBaseScreen';
import { removePrivateKey } from '../../../../actions/key';

class CreateKeyIntroductionScreen extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.navigator.push(screen('CREATE_KEY_SCREEN_STEP_2'));
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>

        <View style={styles.wholeText}>
          <Text messageText style={styles.description}>
            To use a secure blockchain, you need a "private key". We will make your
            private key for you.
          </Text>
          <Text messageText style={styles.description}>
            We require you to write down your private key on paper. This process only
            takes a few minutes.
          </Text>
          <Text messageText style={styles.description}>
            If your phone is lost, stolen, broken, or upgraded, the only way to restore
            your wallet is by entering your private key!
          </Text>
          <Text messageText style={styles.description}>
            We recommend writing on paper because if your key is on your computer or
            phone, someone might steal it.
          </Text>
          <Text messageText style={styles.description}>
            Your private key protects everything in Bitnation, so be sure to put your
            paper with with your private key in a safe place.
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

CreateKeyIntroductionScreen.propTypes = {};

CreateKeyIntroductionScreen.defaultProps = {};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyIntroductionScreen);
