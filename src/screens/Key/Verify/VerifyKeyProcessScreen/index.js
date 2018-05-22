// @flow

import * as React from 'react';
import { View, Alert, Platform } from 'react-native';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import styles from './styles';
import { androidNavigationButtons, screen } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import GridView from '../../../../components/GridView/index';
import PrivateKeyTextInputContainer from '../../../../components/PrivateKeyTextInputContainer/index';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import PanelView from '../../../../components/common/PanelView';
import {
  KEY_LENGTH,
  KEY_COLUMN_COUNT,
  KEY_PAGE_ROW_COUNT,
  KEY_PAGE_LENGTH,
  KEY_PAGE_COUNT,
} from '../../../../global/Constants';
import Button from '../../../../components/common/Button';
import { changeEnteredMnemonic, validateEnteredMnemonic } from '../../../../actions/key';
import Colors from '../../../../global/colors';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import type { State as KeyState } from '../../../../reducers/key';
import type { Mnemonic } from '../../../../types/Mnemonic';
import NavigatorComponent from '../../../../components/common/NavigatorComponent';
import AccountsService from '../../../../services/accounts';
import { errorAlert } from '../../../../global/alerts';

const DONE_BUTTON = 'DONE_BUTTON';

type Props = {
  /**
   * @desc Flag that shows if testing mode is active.
   */
  testingModeActive: boolean,
}

type Actions = {
  /**
   * @desc Function to validate entered mnemonic.
   */
  validateMnemonic: () => void,
  /**
   * @desc Function to change entered mnemonic.
   */
  changeMnemonic: (Mnemonic) => void,
}

type State = {
  currentPage: number,
  selectedInputIndex: number | null,
}

class VerifyKeyProcessScreen extends NavigatorComponent<Actions & KeyState & Props, State> {
  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      selectedInputIndex: null,
    };

    this.props.changeMnemonic(_.fill(new Array(KEY_LENGTH), ''));
    if (this.props.testingModeActive) {
      AccountsService.getMnemonic().then((mnemonic) => {
        this.props.changeMnemonic(mnemonic);
      }).catch((error) => {
        errorAlert(error);
      });
    }
    this.keyTextInputContainers = [];
    this.configureNavigation(this.props);
  }

  keyTextInputContainers: Array<any>;
  scrollView: ?any;

  static doneShouldBeEnabled(props) {
    const inputFilled = _.reduce(
      props.enteredMnemonic,
      (prev, next) => prev && !_.isEmpty(next),
      true,
    );
    return inputFilled && !props.mnemonicValidationInProgress;
  }

  componentWillUpdate(nextProps) {
    if (VerifyKeyProcessScreen.doneShouldBeEnabled(this.props)
      !== VerifyKeyProcessScreen.doneShouldBeEnabled(nextProps)) {
      this.configureNavigation(nextProps);
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
        this.showIncorrectMnemonicAlert();
      } else {
        this.onSuccess();
      }
    }
  }

  configureNavigation(props) {
    if (!this.props.navigator) return;

    this.props.navigator.setButtons({
      rightButtons: VerifyKeyProcessScreen.doneShouldBeEnabled(props) ? [{
        id: DONE_BUTTON,
        title: 'Done',
        buttonColor: Colors.navigationButtonColor,
      }] : [],
    });
  }

  onNavBarButtonPress(id) {
    if (id === DONE_BUTTON) {
      this.props.validateMnemonic();
    }
  }

  showIncorrectMnemonicAlert = () => {
    Alert.alert(
      i18n.t('alerts.incorrectKeyEntered.title'),
      i18n.t('alerts.incorrectKeyEntered.subtitle'),
      [{ text: i18n.t('alerts.incorrectKeyEntered.confirm'), onPress: () => null }],
    );
  };

  onSuccess() {
    if (this.props.navigator) {
      this.props.navigator.push(screen('VERIFY_KEY_SUCCESS_SCREEN'));
    }
  }

  onNextPressed = () => {
    this.setSelectedInputIndex((this.state.currentPage + 1) * KEY_PAGE_LENGTH);
  };

  onPreviousPressed = () => {
    this.setSelectedInputIndex(0);
  };

  setSelectedInputIndex = (index) => {
    const nextIndex = Math.min(Math.max(index, 0), KEY_LENGTH - 1);

    this.setState({
      selectedInputIndex: nextIndex,
      currentPage: Math.floor(nextIndex / KEY_PAGE_LENGTH),
    });
  };

  onValueChange = (index, value) => {
    if (this.props.enteredMnemonic === null) return;

    const values = this.props.enteredMnemonic;
    this.props.changeMnemonic([
      ...values.slice(0, index),
      value.toLowerCase(),
      ...values.slice(index + 1),
    ]);
  };

  onFieldSubmit = (index) => {
    this.setSelectedInputIndex(index + 1);
  };

  onFocus = (index, field) => {
    if (this.state.selectedInputIndex !== index) {
      this.setState({
        selectedInputIndex: index,
      });
    }
    if (this.scrollView) {
      this.scrollView.scrollToFocusedInput(field);
    }
  };

  renderTextInput = (biasedIndex) => {
    const index = biasedIndex + (this.state.currentPage * KEY_PAGE_LENGTH);

    return (
      <PrivateKeyTextInputContainer
        editable
        index={index}
        isLast={index === KEY_LENGTH - 1}
        onChange={this.onValueChange}
        value={(this.props.enteredMnemonic && this.props.enteredMnemonic[index]) || ''}
        label={(index + 1).toString()}
        onSubmit={this.onFieldSubmit}
        key={index}
        onFocus={this.onFocus}
        ref={(input) => {
          this.keyTextInputContainers[index] = input;
        }}
        style={index % KEY_COLUMN_COUNT === 0 ? styles.firstTextInput : styles.textInput}
      />
    );
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={[styles.bodyContainer, styles.noflex]}
            enableAutoAutomaticScroll={false}
            extraHeight={48.5 + 44 + (Platform.OS === 'android' ? 22 : 0)}
            enableOnAndroid
            keyboardShouldPersistTaps='handled'
            ref={scrollView => (this.scrollView = scrollView)}
          >
            <PanelView
              style={styles.panelViewTransparent}
              childrenContainerStyle={styles.noflex}
            >
              <BodyParagraphs paragraphs={i18n.t('screens.verifyKey.process.instructions', { KEY_LENGTH })} />
              <View style={styles.gridContainer}>
                <GridView
                  itemsPerRow={KEY_COLUMN_COUNT}
                  rowsCount={KEY_PAGE_ROW_COUNT}
                  renderItem={this.renderTextInput}
                  style={styles.gridView}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={i18n.t('screens.verifyKey.process.previousButton')}
                  onPress={this.onPreviousPressed}
                  style={styles.button}
                  enabled={this.state.currentPage > 0}
                />
                <Button
                  title={i18n.t('screens.verifyKey.process.nextButton')}
                  onPress={this.onNextPressed}
                  style={styles.button}
                  enabled={this.state.currentPage < KEY_PAGE_COUNT - 1}
                />
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
  changeMnemonic(mnemonic) {
    dispatch(changeEnteredMnemonic(mnemonic));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKeyProcessScreen);
