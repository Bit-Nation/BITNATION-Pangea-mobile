import React, { Component } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../../global/Screens';
import Button from '../../../../components/common/Button';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import KeyBaseScreen from '../../KeyBaseScreen';
import { removePrivateKey } from '../../../../actions/key';
import BodyParagraph from '../../../../components/common/BodyParagraph';

const paragraphs = [
  'To use a secure blockchain, you need a "private key". We will make your private key for you.',
  'We require you to write down your private key on paper. This process only takes a few minutes.',
  'If your phone is lost, stolen, broken, or upgraded, the only way to restore your wallet is by entering your private key!',
  'We recommend writing on paper because if your key is on your computer or phone, someone might steal it.',
  'Your private key protects everything in Bitnation, so be sure to put your paper with with your private key in a safe place.',
];

class CreateKeyIntroductionScreen extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.navigator.push(screen('CREATE_KEY_INSTRUCTION_SCREEN'));
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          {_.map(paragraphs, (text, index) => <BodyParagraph text={text} key={index}/>)}

          <View style={styles.buttonContainer}>
            <Button title='Begin'
                    onPress={() => this.onNextButtonPressed()}/>
          </View>
        </ScrollView>
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
