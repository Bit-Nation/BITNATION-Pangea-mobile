import React, { Component } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import Button from '../../../../components/common/Button';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import { removePrivateKey, savePrivateKey } from '../../../../actions/key';
import KeyBaseScreen from '../../KeyBaseScreen';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';

const paragraphs = [
  'Congratulations, you correctly entered your private key.',
  'Now, put your paper with your private key in a safe place.',
];

class VerifyKeySuccess extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.savePrivateKey();
    this.props.navigator.dismissModal();
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>

        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <BodyParagraphs paragraphs={paragraphs}/>

          <View style={styles.buttonContainer}>
            <Button title='Done'
                    onPress={() => this.onNextButtonPressed()}/>
          </View>
        </ScrollView>

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
