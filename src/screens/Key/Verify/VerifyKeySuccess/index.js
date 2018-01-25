import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Images from '../../../../global/AssetsImages';
import styles from './styles';
import Button from '../../../../components/common/Button';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import Text from '../../../../components/common/Text';
import { removePrivateKey, savePrivateKey } from '../../../../actions/key';
import KeyBaseScreen from '../../KeyBaseScreen';

class VerifyKeySuccess extends KeyBaseScreen {

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
            Congratulations, you correctly entered your private key.
          </Text>
          <Text messageText style={[styles.description, styles.applyBold]}>
            Now, put your paper with your private key in a safe place.
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

VerifyKeySuccess.propTypes = {};

VerifyKeySuccess.defaultProps = {};

const mapStateToProps = state => ({
  ...state.key,
});

const mapDispatchToProps = dispatch => ({
  savePrivateKey() {
    dispatch(savePrivateKey());
  },
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKeySuccess);
