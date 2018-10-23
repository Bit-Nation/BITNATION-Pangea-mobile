// @flow

import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';

import styles from './styles';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';
import { androidNavigationButtons } from '../../../global/Screens';
import Button from '../../../components/common/Button';
import type { Navigator } from '../../../types/ReactNativeNavigation';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function that is called if pin code operation is cancelled.
   */
  onCancel: () => void,
  /**
   * @desc Function that is called when user enters pin code and press on submit button.
   */
  onSubmit: (string) => void,
  /**
   * @desc Function that is called when user press on forget password button.
   */
  onForget: () => void,
  /**
   * @desc Instruction text
   */
  instruction: string,
  /**
   * @desc Pin code length
   */
  pinCodeLength: number,
  /**
   * @desc Whether to show cancel button on the left.
   */
  shouldShowCancel: boolean,
  /**
   * @desc Whether to show forget password button.
   */
  shouldShowForget: boolean,
};

type State = {
  pinCode: string,
}

class PinCodeScreen extends NavigatorComponent<Props, State> {
  static defaultProps;
  textInput: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      pinCode: '',
    };
    this.updateNavigation();
  }

  componentDidUpdate() {
    this.updateNavigation();
  }

  updateNavigation() {
    if (this.props.shouldShowCancel === true) {
      this.props.navigator.setButtons({
        leftButtons: [{
          id: 'cancel',
          title: i18n.t('common.cancel'),
        }],
        rightButtons: [],
      });
    } else {
      this.props.navigator.setButtons({ ...androidNavigationButtons });
    }
  }

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.onCancel();
    }
  }

  render() {
    const { shouldShowForget } = this.props;
    return (
      <View
        testID='pinCode_wrapperView'
        style={styles.bodyContainer}
      >
        <Text style={styles.headline}>
          {this.props.instruction}
        </Text>
        <TextInput
          testID='pinCode_textInput'
          onChangeText={value => this.setState({ pinCode: value.slice(0, this.props.pinCodeLength) })}
          value={this.state.pinCode}
          style={styles.textInput}
          keyboardType='numeric'
          secureTextEntry
          autoFocus
        />
        <View style={styles.buttonContainer}>
          <Button
            testID='pinCode_submitButton'
            enabled={this.state.pinCode.length === this.props.pinCodeLength}
            title={i18n.t('common.ok')}
            onPress={() => this.props.onSubmit(this.state.pinCode)}
            style={styles.submitButton}
          />
        </View>
        {shouldShowForget &&
          <Button
            style={styles.forgetButton}
            styleTitle={styles.forgetButtonText}
            title={i18n.t('screens.password.forgetInstruction')}
            onPress={() => this.props.onForget()}
          />
        }
      </View>
    );
  }
}

PinCodeScreen.defaultProps = {
  shouldShowCancel: false,
  shouldShowForget: false,
};

export default PinCodeScreen;
