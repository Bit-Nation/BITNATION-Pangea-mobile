// @flow

import React from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';

import styles from './styles';
import NavigatorComponent from 'pangea-common-reactnative/UI/NavigatorComponent';
import i18n from 'pangea-common/i18n';
import { androidNavigationButtons } from 'pangea-common-reactnative/Screens';
import Button from 'pangea-common-reactnative/UI/Button';
import type { Navigator } from '../../../types/ReactNativeNavigation';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to perform cancel login.
   */
  cancelLogin?: () => void,
  /**
   * @desc Function that is called when user enters pin code and press on submit button.
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
   * @desc Whether to show cancel button on the left.
   */
  shouldShowCancel: boolean,
  /**
   * @desc Whether to show forget password button.
   */
  shouldShowForget: boolean,
};

type State = {
  password: string,
}

class PasswordScreen extends NavigatorComponent<Props, State> {
  static defaultProps;
  textInput: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      password: '',
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

  onBackPress() {
    if (this.props.cancelLogin) { this.props.cancelLogin(); }
    this.props.onCancel();
  }

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      if (this.props.cancelLogin) { this.props.cancelLogin(); }
      this.props.onCancel();
    }
  }

  render() {
    const { shouldShowForget } = this.props;
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.headline}>
          {this.props.instruction}
        </Text>
        <TextInput
          onChangeText={value => this.setState({ password: value })}
          value={this.state.password}
          style={styles.textInput}
          secureTextEntry
          autoFocus
          autoCapitalize='none'
        />
        <View style={styles.buttonContainer}>
          <Button
            enabled={this.state.password.length > 0}
            title={i18n.t('common.ok')}
            onPress={() => {
              Keyboard.dismiss();
              this.props.onSubmit(this.state.password);
            }}
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

PasswordScreen.defaultProps = {
  shouldShowCancel: false,
  shouldShowForget: false,
};

export default PasswordScreen;
