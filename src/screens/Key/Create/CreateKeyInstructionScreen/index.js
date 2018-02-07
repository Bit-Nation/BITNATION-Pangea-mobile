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
import i18n from '../../../../global/i18n';

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
          <BodyParagraphs paragraphs={i18n.t('screens.createKey.instructions.beforeGrid', { KEY_LENGTH })}/>
          <View style={styles.gridContainer}>
            <Image style={styles.privateKeyDemoImage} resizeMode='contain' source={AssetsImages.privateKeyDemo}/>
          </View>
          <BodyParagraphs paragraphs={i18n.t('screens.createKey.instructions.afterGrid')}/>
          <View style={styles.buttonContainer}>
            <Button title={i18n.t('screens.createKey.startButton')}
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