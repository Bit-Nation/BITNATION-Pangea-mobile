import React, { Component } from 'react';
import {
  View, TouchableOpacity, Alert, Platform, ScrollView
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

import { screen, androidNavigationButtons } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import Text from '../../../../components/common/Text';
import GridView from '../../../../components/GridView';
import Button from '../../../../components/common/Button';
import PrivateKeyTextInputContainer from '../../../../components/PrivateKeyTextInputContainer';
import { KEY_ROW_COUNT, KEY_COLUMN_COUNT } from '../../../../global/Constants';
import CreateKeyBaseScreen from '../CreateKeyBaseScreen/index';


export default class CreateKeyStep2 extends CreateKeyBaseScreen {

  onNextButtonPressed() {
    this.props.navigator.push(screen('CREATE_KEY_SCREEN_STEP_3'));
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
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <View>
            <View style={styles.instructionContainer}>
              <Text messageText style={styles.instruction}>
                We will show you a group of 24 words that is the private key that unlocks your wallet.
              </Text>
            </View>
            <View style={styles.gridContainer}>
              <GridView
                itemsPerRow={KEY_COLUMN_COUNT}
                rowsCount={KEY_ROW_COUNT}
                renderItem={this._renderText}
                style={styles.gridView}
              />
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
        </ScrollView>
      </View>
    );
  }

}
