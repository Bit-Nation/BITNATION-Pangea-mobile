// @flow

import * as React from 'react';
import { View, Alert, Platform } from 'react-native';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import GridView from '../../../components/GridView/index';
import PrivateKeyTextInputContainer from '../../../components/PrivateKeyTextInputContainer/index';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import PanelView from '../../../components/common/PanelView';
import {
  KEY_LENGTH,
  KEY_COLUMN_COUNT,
  KEY_PAGE_ROW_COUNT,
  KEY_PAGE_LENGTH,
  KEY_PAGE_COUNT,
} from '../../../global/Constants';
import Button from '../../../components/common/Button';
import { changeEnteredMnemonic, validateEnteredMnemonic } from '../../../actions/key';
import Colors from '../../../global/colors';
import BodyParagraphs from '../../../components/common/BodyParagraphs';
import i18n from '../../../global/i18n';
import type { State as KeyState } from '../../../reducers/key';
import type { Mnemonic } from '../../../types/Mnemonic';
import NavigatorComponent from '../../../components/common/NavigatorComponent';

const DONE_BUTTON = 'DONE_BUTTON';

type Props = {
  /**
   * @desc Flag that shows if testing mode is active.
   */
  testingModeActive: boolean,
  /**
   * @desc Callback to be called when user done mnemonic entering.
   */
  onDoneEntering: (Mnemonic) => void,
  /**
   * @desc Callback to be called when user cancel mnemonic entering.
   */
  onCancel: () => void,
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

class RestoreKeyScreen extends NavigatorComponent<Actions & KeyState & Props, State> {
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
    if (RestoreKeyScreen.doneShouldBeEnabled(this.props)
      !== RestoreKeyScreen.doneShouldBeEnabled(nextProps)) {
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
      if (this.props.mnemonicValid === false) {
        this.showIncorrectMnemonicAlert();
      } else {
        // We are sure that mnemonic is non-null here, so we do type conversion.
        this.props.onDoneEntering(((this.props.enteredMnemonic: any): Mnemonic));
      }
    }
  }

  showIncorrectMnemonicAlert = () => {
    Alert.alert(
      i18n.t('alerts.incorrectKeyEntered.title'),
      i18n.t('alerts.incorrectKeyEntered.subtitle'),
      [{ text: i18n.t('alerts.incorrectKeyEntered.confirm'), onPress: () => null }],
    );
  };

  configureNavigation(props) {
    if (!this.props.navigator) return;

    this.props.navigator.setButtons({
      leftButtons: [{
        id: 'cancel',
        title: i18n.t('common.cancel'),
        buttonColor: Colors.navigationButtonColor,
      }],
      rightButtons: RestoreKeyScreen.doneShouldBeEnabled(props) ? [{
        id: DONE_BUTTON,
        title: 'Done',
        buttonColor: Colors.navigationButtonColor,
      }] : [],
    });
  }

  onNavBarButtonPress(id) {
    switch (id) {
      case DONE_BUTTON: {
        this.props.validateMnemonic();
        break;
      }
      case 'cancel': {
        this.props.onCancel();
        break;
      }
      default:
        break;
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
            contentContainerStyle={styles.bodyContainer}
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
                  style={styles.buttonPrevNext}
                  enabled={this.state.currentPage > 0}
                />
                <Button
                  title={i18n.t('screens.verifyKey.process.nextButton')}
                  onPress={this.onNextPressed}
                  style={styles.buttonPrevNext}
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
});

const mapDispatchToProps = dispatch => ({
  changeMnemonic(mnemonic) {
    dispatch(changeEnteredMnemonic(mnemonic));
  },
  validateMnemonic() {
    dispatch(validateEnteredMnemonic());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestoreKeyScreen);
