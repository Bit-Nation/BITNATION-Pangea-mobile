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
import CreateKeyBaseScreen from '../CreateKeyBaseScreen/index';
import { savePrivateKey } from '../../../../actions/wallet';

class CreateKeySuccessScreen extends CreateKeyBaseScreen {

  onNextButtonPressed() {
    this.props.savePrivateKey();
    this.props.navigator.dismissModal();
  }

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
        </View>

        <View style={styles.buttonContainer}>
          <Button title='Done'
                  onPress={() => this.onNextButtonPressed()}/>
        </View>

      </View>
    );
  }
}

CreateKeySuccessScreen.propTypes = {};

CreateKeySuccessScreen.defaultProps = {};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  savePrivateKey() {
    dispatch(savePrivateKey());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeySuccessScreen);
