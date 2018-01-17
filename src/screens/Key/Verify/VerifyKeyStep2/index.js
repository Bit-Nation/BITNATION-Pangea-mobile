import React, { Component } from 'react';
import {
  View, Alert, Platform,
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
import {
  KEY_LENGTH, KEY_COLUMN_COUNT, KEY_ROW_COUNT, KEY_PAGE_ROW_COUNT, KEY_PAGE_LENGTH,
} from '../../../../global/Constants';
import containerPromise from '../../../../services/container';
import { compressMnemonic } from '../../../../utils/key';
import KeyBaseScreen from '../../KeyBaseScreen';
import Button from '../../../../components/common/Button';

const DONE_BUTTON = 'DONE_BUTTON';

export default class EnterPrivateKeyScreen extends KeyBaseScreen {

  constructor(props) {
    super(props);

    this.state = {
      values: _.fill(new Array(KEY_LENGTH), ''),
      currentPage: 0,
      selectedInputIndex: null,
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

  componentDidUpdate() {
    if (this.state.selectedInputIndex !== null) {
      const input = this.keyTextInputContainers[this.state.selectedInputIndex].textInput;
      if (!input.isFocused()) {
        input.focus();
      }
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
    super.onNavBarButtonPress(id);
    if (id === DONE_BUTTON) {
      this._verifyMnemonic(this.state.values)
        .then(() => this.onSuccess())
        .catch(() => this._showIncorrectCodeAlert());
    }
  }

  _verifyMnemonic = async (mnemonic) => {
    const container = await containerPromise;
    return await container.eth.utils.mnemonicValid(compressMnemonic(mnemonic));
  };

  _showIncorrectCodeAlert = () => {
    Alert.alert(
      'Incorrect: Check all the words.',
      '',
      [{ text: 'OK', onPress: () => null }],
    );
  };

  onSuccess() {
    this.props.navigator.push(screen('VERIFY_KEY_SUCCESS_SCREEN'));
  }

  onNextPressed = () => {
    this._changeSelectedInputIndex(1);
  };

  onPreviousPressed = () => {
    this._changeSelectedInputIndex(-1);
  };

  _changeSelectedInputIndex = (diff) => {
    if (this.state.selectedInputIndex === null) return;

    this.setState(prevState => {
      const nextIndex = Math.min(Math.max(prevState.selectedInputIndex + diff, 0), KEY_LENGTH - 1);

      return {
        selectedInputIndex: nextIndex,
        currentPage: Math.floor(nextIndex / KEY_PAGE_LENGTH),
      };
    });
  };

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
    this.onNextPressed();
  };

  _onFocus = (index, field) => {
    if (this.state.selectedInputIndex !== index) {
      this.setState({
        selectedInputIndex: index,
      });
    }
    this.scrollView.scrollToFocusedInput(field);
  };

  _renderTextInput = (index) => {
    index += this.state.currentPage * KEY_PAGE_LENGTH;

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
          keyboardShouldPersistTaps='handled'
          ref={(scrollView) => this.scrollView = scrollView}>
          <View>
            <View style={styles.instructionContainer}>
              <Text messageText style={styles.instruction}>
                Enter in the correct order the {KEY_LENGTH} words that you wrote down as your paper key. Tap a box to
                begin.
              </Text>
            </View>
            <View style={styles.gridContainer}>
              <GridView
                itemsPerRow={KEY_COLUMN_COUNT}
                rowsCount={KEY_PAGE_ROW_COUNT}
                renderItem={this._renderTextInput}
                style={styles.gridView}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Previous'
                      onPress={this.onPreviousPressed}
                      style={styles.button}/>
              <Button title='Next'
                      onPress={this.onNextPressed}
                      style={styles.button}/>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

    