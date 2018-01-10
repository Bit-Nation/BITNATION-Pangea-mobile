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
import NavigatorComponent from '../../../../components/common/NavigatorComponent';
import Colors from '../../../../global/Colors';

class VerifyKeyStep1 extends NavigatorComponent {

  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: 'Cancel',
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  onNavBarButtonPress(id) {
    if (id === 'cancel') {
      this.props.navigator.dismissModal();
    }
  }

  onNextButtonPressed() {
    this.props.navigator.push(screen('VERIFY_KEY_SCREEN_STEP_2'));
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>

        <View style={styles.wholeText}>
          <Text messageText style={styles.description}>Now that you have written down your private key, we will ask you
            to verify
            it.</Text>
          <Text messageText style={styles.description}>You will type the 12 words of your private key into the app, and
            we will
            check that your written private key is correct.</Text>
          <Text messageText style={styles.description}>Your private key protects everything in Bitnation, so be sure to
            put your
            paper with your private key in a safe place.</Text>
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
  ...state,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKeyStep1);
