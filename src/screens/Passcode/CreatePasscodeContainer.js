// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import PinCodeScreen from './PinCode/index';
import { type State as SettingsState } from '../../reducers/settings';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import i18n from '../../global/i18n';
import { savePinCode, savePassword } from '../../actions/accounts';
import { alert, errorAlert } from '../../global/alerts';
import PasswordScreen from './Password/index';
import type { Navigator } from '../../types/ReactNativeNavigation';
import styles from './PinCode/styles';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import ScreenTitle from '../../components/common/ScreenTitle';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Title of the screen.
   */
  title: string,
  /**
   * @desc Callback on cancellation of entering passcode.
   */
  onCancel: () => void,
  /**
   * @desc Callback on successful passcode entering.
   */
  onSuccess: () => void,
  /**
   * @desc Id of account which passcode will be created or edited.
   */
  accountId: ?string
};

type Actions = {
  /**
   * @desc Check entered pin code.
   */
  savePinCode: (pinCode: string, accountId: ?string, callback: (success: boolean) => void) => void,
  /**
   * @desc Check entered password.
   */
  savePassword: (password: string, accountId: ?string, callback: (success: boolean) => void) => void,
};

type State = {
  enteredPasscode: ?string,
  /**
   * @desc These reset keys are used to reset state of child components.
   */
  verifyResetKey: number,
  createResetKey: number,
};

class CreatePasscodeContainer extends NavigatorComponent<Props & Actions & SettingsState, State> {
  static defaultProps;

  constructor(props: Props & Actions & SettingsState) {
    super(props);

    this.state = {
      enteredPasscode: undefined,
      verifyResetKey: 0,
      createResetKey: 0,
    };
  }

  onSaveFinished = (success: boolean) => {
    if (success === true) {
      this.setState({
        enteredPasscode: undefined,
      });
      this.props.onSuccess();
      return;
    }

    errorAlert(i18n.t('error.passcodeCreationFailed'));
  };

  showVerificationFailedAlert = () => {
    alert('passcodeVerificationFailed', [
      {
        name: 'tryAgain',
        onPress: () => {
          this.setState(prevState => ({
            verifyResetKey: prevState.verifyResetKey + 1,
          }));
        },
      },
      {
        name: 'startOver',
        onPress: () => {
          this.setState(prevState => ({
            createResetKey: prevState.createResetKey + 1,
            verifyResetKey: prevState.verifyResetKey + 1,
            enteredPasscode: undefined,
          }));
        },
      },
    ]);
  };

  onSubmitPasscode = (passcode: string) => {
    if (this.state.enteredPasscode === passcode) {
      if (this.props.passcodeInfo.type === 'pinCode') {
        this.props.savePinCode(passcode, this.props.accountId, this.onSaveFinished);
      } else {
        this.props.savePassword(passcode, this.props.accountId, this.onSaveFinished);
      }
    } else {
      this.showVerificationFailedAlert();
    }
  };

  onCreatePasscode = (passcode: string) => {
    this.setState({ enteredPasscode: passcode });
  };

  onCancelVerificationPasscode = () => {
    this.setState(prevState => ({
      verifyResetKey: prevState.verifyResetKey + 1,
      enteredPasscode: undefined,
    }));
  };

  render() {
    const { title } = this.props;
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyAccountContainer}>
          <ScreenTitle title={title} />
          {this.renderPasscodeScreen()}
        </View>
      </View>
    );
  }

  renderPasscodeScreen() {
    const {
      navigator, passcodeInfo, onCancel,
    } = this.props;

    if (passcodeInfo.type === 'pinCode') {
      if (this.state.enteredPasscode == null) {
        return (
          <PinCodeScreen
            key={`create ${this.state.createResetKey}`}
            navigator={navigator}
            pinCodeLength={passcodeInfo.length}
            instruction={i18n.t('screens.pinCode.createInstruction')}
            shouldShowCancel
            onCancel={onCancel}
            onSubmit={this.onCreatePasscode}
          />);
      }

      return (
        <PinCodeScreen
          key={`verify ${this.state.verifyResetKey}`}
          resetKey={this.state.verifyResetKey}
          navigator={navigator}
          pinCodeLength={passcodeInfo.length}
          instruction={i18n.t('screens.pinCode.verifyInstruction')}
          shouldShowCancel
          onCancel={this.onCancelVerificationPasscode}
          onSubmit={this.onSubmitPasscode}
        />);
    }

    if (this.state.enteredPasscode == null) {
      return (
        <PasswordScreen
          key={`create ${this.state.createResetKey}`}
          navigator={navigator}
          instruction={i18n.t('screens.password.createInstruction')}
          shouldShowCancel
          onCancel={onCancel}
          onSubmit={this.onCreatePasscode}
        />);
    }

    return (
      <PasswordScreen
        key={`verify ${this.state.verifyResetKey}`}
        navigator={navigator}
        instruction={i18n.t('screens.password.verifyInstruction')}
        shouldShowCancel
        onCancel={this.onCancelVerificationPasscode}
        onSubmit={this.onSubmitPasscode}
      />);
  }
}

CreatePasscodeContainer.defaultProps = {
  onCancel: () => undefined,
  onSuccess: () => undefined,
  title: '',
  accountId: null,
};

const mapStateToProps = state => ({
  ...state.settings,
});

const mapDispatchToProps = dispatch => ({
  savePinCode(pinCode, accountId, callback) {
    dispatch(savePinCode(pinCode, accountId, callback));
  },
  savePassword(password, accountId, callback) {
    dispatch(savePassword(password, accountId, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePasscodeContainer);
