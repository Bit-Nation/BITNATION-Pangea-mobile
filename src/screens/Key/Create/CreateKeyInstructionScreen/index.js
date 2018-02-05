import React, { Component } from 'react';
import {
  View, ScrollView, Image, Text,
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { screen } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import Button from '../../../../components/common/Button';
import { KEY_LENGTH } from '../../../../global/Constants';
import KeyBaseScreen from '../../KeyBaseScreen/index';
import { createPrivateKey, removePrivateKey } from '../../../../actions/key';
import AssetsImages from '../../../../global/AssetsImages';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';

const topParagraphs = [
  `We will show you a group of ${KEY_LENGTH} words that is the private key that unlocks your wallet.`,
];

const bottomParagraphs = [
  'Write the words on paper, in order. Store the paper in very safe place. If your device is lost, stolen, broken, or upgraded, you must have this key to restore or unlock your wallet.',
];


class CreateKeyInstructionScreen extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.createPrivateKey();
    this.props.navigator.push(screen('CREATE_KEY_PROCESS_SCREEN'));
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <BodyParagraphs paragraphs={topParagraphs}/>
          <View style={styles.gridContainer}>
            <Image style={styles.privateKeyDemoImage} resizeMode='contain' source={AssetsImages.privateKeyDemo}/>
          </View>
          <BodyParagraphs paragraphs={bottomParagraphs}/>
          <View style={styles.buttonContainer}>
            <Button title='Begin'
                    onPress={() => this.onNextButtonPressed()}/>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createPrivateKey() {
    dispatch(createPrivateKey());
  },
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyInstructionScreen);