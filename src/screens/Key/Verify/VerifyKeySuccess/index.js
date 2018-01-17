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
import { savePrivateKey } from '../../../../actions/key';

class VerifyKeySuccess extends Component {

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
  ...state,
});

const mapDispatchToProps = dispatch => ({
  savePrivateKey() {
    dispatch(savePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKeySuccess);
