// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PinCodeScreen from './PinCode/index';
import { type State as SettingsState } from '../../reducers/settings';
import NavigatorComponent from 'pangea-common-reactnative/UI/NavigatorComponent';
import i18n from 'pangea-common/i18n';
import { checkPinCode, checkPassword, login, cancelLogin } from '../../accounts-actions';
import { errorAlert } from 'pangea-common/alerts';
import PasswordScreen from './Password/index';
import styles from './PinCode/styles';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import type { AsyncTask } from 'pangea-common/utils/asyncTask';
import Loading from 'pangea-common-reactnative/UI/Loading';

type Props = {
  /**
   * @desc Callback on cancellation of entering passcode.
   */
  onCancel: () => void,
  /**
   * @desc Callback on successful passcode entering.
   */
  onSuccess: () => void,
  /**
   * @desc Function that is called when user press on forget password button.
   */
  onForget: () => void,
  /**
   * @desc Title of the screen.
   */
  title: string,
  /**
   * @desc Id of account which passcode will be entered.
   */
  accountId: string,
  /**
   * @desc Flag if there is currently logged in account.
   */
  isLoggedIn: boolean,
  /**
   * @desc Task that describes current login status.
   */
  loginTask: AsyncTask<void>,
}

type Actions = {
  /**
   * @desc Check entered pin code.
   */
  checkPinCode: (pinCode: string, accountId: string, callback: (success: boolean) => void) => void,
  /**
   * @desc Check entered password.
   */
  checkPassword: (password: string, accountId: string, callback: (success: boolean) => void) => void,
  /**
   * @desc Action to perform a login.
   */
  login: (password: string, accountId: string) => void,
  /**
   * @desc Action to perform cancel login.
   */
  cancelLogin: () => void,
}

class EnterPasscodeContainer extends NavigatorComponent<Props & Actions & SettingsState> {
  static defaultProps;

  componentDidUpdate(prevProps: Props & Actions & SettingsState) {
    if (prevProps.loginTask !== this.props.loginTask && this.props.loginTask.error != null) {
      errorAlert(this.props.loginTask.error);
    }
  }

  onCheckFinished = (success: boolean) => {
    if (success === true) {
      this.props.onSuccess();
      return;
    }

    if (this.props.passcodeType.type === 'pinCode') {
      errorAlert(i18n.t('error.invalidPinCode'));
    } else {
      errorAlert(i18n.t('error.invalidPassword'));
    }
  };

  onPasscodeEntered = (passcode) => {
    const { accountId, isLoggedIn } = this.props;
    if (isLoggedIn === false) {
      this.props.login(accountId, passcode);
      return;
    }

    if (this.props.passcodeType.type === 'pinCode') {
      this.props.checkPinCode(passcode, accountId, this.onCheckFinished);
    } else {
      this.props.checkPassword(passcode, accountId, this.onCheckFinished);
    }
  };

  onForgetPasscode = () => {
    this.props.onForget();
  }

  renderPasscodeScreen() {
    const {
      navigator, passcodeType, title, onCancel, isLoggedIn,
    } = this.props;
    const shouldShowForget = isLoggedIn === false;
    if (passcodeType.type === 'pinCode') {
      return (<PinCodeScreen
        navigator={navigator}
        pinCodeLength={passcodeType.length}
        instruction={i18n.t('screens.pinCode.enterInstruction')}
        title={title}
        shouldShowCancel
        onCancel={onCancel}
        onSubmit={this.onPasscodeEntered}
        shouldShowForget={shouldShowForget}
        onForget={this.onForgetPasscode}
        cancelLogin={this.props.cancelLogin}
      />);
    }

    return (<PasswordScreen
      navigator={navigator}
      instruction={i18n.t('screens.password.enterInstruction')}
      title={title}
      shouldShowCancel
      onCancel={onCancel}
      onSubmit={this.onPasscodeEntered}
      shouldShowForget={shouldShowForget}
      onForget={this.onForgetPasscode}
      cancelLogin={this.props.cancelLogin}
    />);
  }

  render() {
    const { title } = this.props;
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={title} />
        {this.renderPasscodeScreen()}
        {this.props.loginTask.inProgress === true && <Loading />}
      </View>
    );
  }
}

EnterPasscodeContainer.defaultProps = {
  onCancel: () => undefined,
  onSuccess: () => undefined,
  title: '',
};

const mapStateToProps = state => ({
  ...state.settings,
  loginTask: state.accounts.login,
  isLoggedIn: state.accounts.currentAccountId !== null,
});

const mapDispatchToProps = dispatch => ({
  checkPinCode(pinCode, accountId, callback) {
    dispatch(checkPinCode(pinCode, accountId, callback));
  },
  checkPassword(password, accountId, callback) {
    dispatch(checkPassword(password, accountId, callback));
  },
  login(password, accountId) {
    dispatch(login(password, accountId));
  },
  cancelLogin() {
    dispatch(cancelLogin());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscodeContainer);
