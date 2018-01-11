import React, { Component } from 'react';
import {
  View, Alert, Platform
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import { screen, androidNavigationButtons } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import Text from '../../../../components/common/Text';
import GridView from '../../../../components/GridView/index';
import PrivateKeyTextInputContainer from '../../../../components/PrivateKeyTextInputContainer/index';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import { KEY_LENGTH, KEY_COLUMN_COUNT, KEY_ROW_COUNT } from '../../../../global/Constants';
import NavigatorComponent from '../../../../components/common/NavigatorComponent';
import container from '../../../../services/container';
import { compressMnemonic } from '../../../../utils/wallet';

const DONE_BUTTON = 'DONE_BUTTON';

export default class EnterPrivateKeyScreen extends NavigatorComponent {

  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props) {
    super(props);

    this.state = {
      values: _.fill(new Array(KEY_LENGTH), ''),
    };
    this.keyTextInputContainers = [];
    this._configureNavigation(this.state);
  }

  doneShouldBeEnabled(state) {
    return _.reduce(state.values, (prev, next) => prev && !_.isEmpty(next), true);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.doneShouldBeEnabled(this.state) !== this.doneShouldBeEnabled(nextState)) {
      this._configureNavigation(nextState);
    }
  }

  _configureNavigation(state) {
    this.props.navigator.setButtons({
      rightButtons: [{
        id: DONE_BUTTON,
        title: 'Done',
        disabled: !this.doneShouldBeEnabled(state),
      }],
    });
  }

  onNavBarButtonPress(id) {
    if (id === DONE_BUTTON) {
      this._verifyMnemonic(this.state.values)
        .then(() => this.onSuccess())
        .catch(() => this._showIncorrectCodeAlert());
    }
  }

  _verifyMnemonic = async (mnemonic) => {
    return await container.panthalassa.ethereum.utils.mnemonicValid(compressMnemonic(mnemonic));
  };

  _showIncorrectCodeAlert = () => {
    Alert.alert(
      'Incorrect: Check all the words.',
      '',
      [{ text: 'OK', onPress: () => null }]
    );
  };

  onSuccess() {
    this.props.navigator.push(screen('VERIFY_KEY_SUCCESS_SCREEN'));
  }

  _onValueChange = (index, value) => {
    this.setState((prevState) => {
      const { values, ...state } = prevState;
      return {
        ...state,
        values: [
          ...values.slice(0, index),
          value,
          ...values.slice(index + 1),
        ],
      };
    });
  };

  _onFieldSubmit = (index) => {
    if (index < KEY_LENGTH - 1) {
      this.keyTextInputContainers[index + 1].textInput.focus();
    }
  };

  _onFocus = (field) => {
    this.scrollView.scrollToFocusedInput(field);
  };

  _renderTextInput = (index) => {
    return (
      <PrivateKeyTextInputContainer
        editable={true}
        index={index}
        isLast={index === KEY_LENGTH - 1}
        onChange={this._onValueChange}
        value={this.state.values[index]}
        label={(index + 1).toString()}
        onSubmit={this._onFieldSubmit}
        key={index}
        onFocus={this._onFocus}
        ref={(input) => {
          this.keyTextInputContainers[index] = input;
        }}
        style={{ marginLeft: (index % KEY_COLUMN_COUNT === 0) ? 0 : 10 }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollViewContentContainer}
          enableAutoAutomaticScroll={false}
          extraHeight={48.5 + 44 + (Platform.OS === 'android' ? 22 : 0)}
          enableOnAndroid
          ref={(scrollView) => this.scrollView = scrollView}>
          <View>
            <View style={styles.instructionContainer}>
              <Text messageText style={styles.instruction}>
                Enter in the correct order the 24 words that you wrote down as your paper key. Tap a box to begin.
              </Text>
            </View>
            <View style={styles.gridContainer}>
              <GridView
                itemsPerRow={KEY_COLUMN_COUNT}
                rowsCount={KEY_ROW_COUNT}
                renderItem={this._renderTextInput}
                style={styles.gridView}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

    