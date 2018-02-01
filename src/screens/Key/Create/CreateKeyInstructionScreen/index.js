import React, { Component } from 'react';
import {
  View, TouchableOpacity, Alert, Platform, ScrollView, Image,
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { screen, androidNavigationButtons } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import Text from '../../../../components/common/Text';
import GridView from '../../../../components/GridView';
import Button from '../../../../components/common/Button';
import PrivateKeyTextInputContainer from '../../../../components/PrivateKeyTextInputContainer';
import { KEY_COLUMN_COUNT, KEY_PAGE_ROW_COUNT, KEY_LENGTH } from '../../../../global/Constants';
import KeyBaseScreen from '../../KeyBaseScreen/index';
import { createPrivateKey, removePrivateKey } from '../../../../actions/key';
import AssetsImages from '../../../../global/assetsImagesResources';


class CreateKeyInstructionScreen extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.createPrivateKey();
    this.props.navigator.push(screen('CREATE_KEY_PROCESS_SCREEN'));
  }

  _renderText = (index) => {
    return (
      <PrivateKeyTextInputContainer
        editable={false}
        index={index}
        value='word'
        label={(index + 1).toString()}
        key={index}
        style={{ marginLeft: (index % KEY_COLUMN_COUNT === 0) ? 0 : 10 }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <View style={styles.contentContainer}>
          <View style={styles.instructionContainer}>
            <Text messageText style={styles.instruction}>
              We will show you a group of {KEY_LENGTH} words that is the private key that unlocks your wallet.
            </Text>
          </View>
          <View style={styles.gridContainer}>
            <Image style={styles.privateKeyDemoImage} resizeMode='contain' source={AssetsImages.privateKeyDemo} />
          </View>
          <View style={styles.instructionContainer}>
            <Text messageText style={styles.instruction}>
              Write the words on paper, in order. Store the paper in very safe place. If your device is lost, stolen,
              broken, or upgraded, you must have this key to restore or unlock your wallet.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Begin'
                    onPress={() => this.onNextButtonPressed()}/>
          </View>
        </View>
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