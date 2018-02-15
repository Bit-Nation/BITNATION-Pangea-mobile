import React, { Component } from 'react';
import {
  View, Alert, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import GridView from '../../../../components/GridView/index';
import PrivateKeyTextInputContainer from '../../../../components/PrivateKeyTextInputContainer/index';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import PanelView from '../../../../components/common/PanelView';
import {
  KEY_LENGTH, KEY_COLUMN_COUNT, KEY_PAGE_ROW_COUNT, KEY_PAGE_LENGTH, KEY_PAGE_COUNT,
} from '../../../../global/Constants';
import KeyBaseScreen from '../../KeyBaseScreen';
import Button from '../../../../components/common/Button';
import { changeEnteredMnemonic, removePrivateKey, validateEnteredMnemonic } from '../../../../actions/key';
import Colors from '../../../../global/colors';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';

const DONE_BUTTON = 'DONE_BUTTON';

class VerifyKeyProcessScreen extends KeyBaseScreen {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      selectedInputIndex: null,
    };

    this.props.changeMnemonic(_.fill(new Array(KEY_LENGTH), ''));
    if (this.props.testingModeActive && this.props.createdMnemonic) {
      this.props.changeMnemonic(this.props.createdMnemonic);
    }
    this.keyTextInputContainers = [];
    this._configureNavigation(this.props);
  }

  doneShouldBeEnabled(props) {
    const inputFilled = _.reduce(props.enteredMnemonic, (prev, next) => prev && !_.isEmpty(next), true);
    return inputFilled && !props.mnemonicValidationInProgress;
  }

  componentWillUpdate(nextProps) {
    if (this.doneShouldBeEnabled(this.props) !== this.doneShouldBeEnabled(nextProps)) {
      this._configureNavigation(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.selectedInputIndex !== null) {
      const input = this.keyTextInputContainers[this.state.selectedInputIndex].textInput;
      if (!input.isFocused()) {
        input.focus();
      }
    }

    if (this.props.mnemonicValid !== prevProps.mnemonicValid
      && this.props.mnemonicValid !== null) {
      if (!this.props.mnemonicValid) {
        this._showIncorrectMnemonicAlert();
      } else {
        this._onSuccess();
      }
    }
  }

  _configureNavigation(props, state) {
    this.props.navigator.setButtons({
      rightButtons: this.doneShouldBeEnabled(props, state) ? [{
        id: DONE_BUTTON,
        title: 'Done',
        buttonColor: Colors.navigationButtonColor,
      }] : [],
    });
  }

  onNavBarButtonPress(id) {
    super.onNavBarButtonPress(id);
    if (id === DONE_BUTTON) {
      this.props.validateMnemonic(this.state.values);
    }
  }

  _showIncorrectMnemonicAlert = () => {
    Alert.alert(
      i18n.t('alerts.incorrectKeyEntered.title'),
      i18n.t('alerts.incorrectKeyEntered.subtitle'),
      [{ text: i18n.t('alerts.incorrectKeyEntered.confirm'), onPress: () => null }],
    );
  };

  _onSuccess() {
    this.props.navigator.push(screen('VERIFY_KEY_SUCCESS_SCREEN'));
  }

  onNextPressed = () => {
    this._setSelectedInputIndex((this.state.currentPage + 1) * KEY_PAGE_LENGTH);
  };

  onPreviousPressed = () => {
    this._setSelectedInputIndex(0);
  };

  _setSelectedInputIndex = (index) => {
    const nextIndex = Math.min(Math.max(index, 0), KEY_LENGTH - 1);

    this.setState({
      selectedInputIndex: nextIndex,
      currentPage: Math.floor(nextIndex / KEY_PAGE_LENGTH),
    });
  };

  _onValueChange = (index, value) => {
    const values = this.props.enteredMnemonic;
    this.props.changeMnemonic([
      ...values.slice(0, index),
      value.toLowerCase(),
      ...values.slice(index + 1),
    ]);
  };

  _onFieldSubmit = (index) => {
    this._setSelectedInputIndex(index + 1);
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
        value={(this.props.enteredMnemonic && this.props.enteredMnemonic[index]) || ''}
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

  /*
  MAIN SCREEN
   */

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <View style={styles.bodyContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.bodyContainer}
            enableAutoAutomaticScroll={false}
            extraHeight={48.5 + 44 + (Platform.OS === 'android' ? 22 : 0)}
            enableOnAndroid
            keyboardShouldPersistTaps='handled'
            ref={(scrollView) => this.scrollView = scrollView}>

            <PanelView style={styles.panelViewTransparent}
                       childrenContainerStyle={{ flex: 0, }}
            >

              <BodyParagraphs paragraphs={i18n.t('screens.verifyKey.process.instructions', { KEY_LENGTH })}/>
              <View style={styles.gridContainer}>
                <GridView
                  itemsPerRow={KEY_COLUMN_COUNT}
                  rowsCount={KEY_PAGE_ROW_COUNT}
                  renderItem={this._renderTextInput}
                  style={styles.gridView}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button title={i18n.t('screens.verifyKey.process.previousButton')}
                        onPress={this.onPreviousPressed}
                        style={styles.button}
                        enabled={this.state.currentPage > 0}/>
                <Button title={i18n.t('screens.verifyKey.process.nextButton')}
                        onPress={this.onNextPressed}
                        style={styles.button}
                        enabled={this.state.currentPage < KEY_PAGE_COUNT - 1}/>
              </View>
            </PanelView>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.key,
  testingModeActive: state.testingMode.isActive,
});

const mapDispatchToProps = dispatch => ({
  validateMnemonic() {
    dispatch(validateEnteredMnemonic());
  },
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
  changeMnemonic(mnemonic) {
    dispatch(changeEnteredMnemonic(mnemonic));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKeyProcessScreen);