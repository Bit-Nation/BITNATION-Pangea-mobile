// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import PinCodeScreen from './PinCode/index';
import { type State as SettingsState } from '../../reducers/settings';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import i18n from '../../global/i18n';
import { checkPinCode, checkPassword, login } from '../../actions/accounts';
import { errorAlert } from '../../global/alerts';
import PasswordScreen from './Password/index';
import styles from './PinCode/styles';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import ScreenTitle from '../../components/common/ScreenTitle';
import type { AsyncTask } from '../../utils/asyncTask';

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

  renderPasscodeScreen() {
    const {
      navigator, passcodeType, title, onCancel,
    } = this.props;
    if (passcodeType.type === 'pinCode') {
      return (<PinCodeScreen
        navigator={navigator}
        pinCodeLength={passcodeType.length}
        instruction={i18n.t('screens.pinCode.enterInstruction')}
        title={title}
        shouldShowCancel
        onCancel={onCancel}
        onSubmit={this.onPasscodeEntered}
      />);
    }

    return (<PasswordScreen
      navigator={navigator}
      instruction={i18n.t('screens.password.enterInstruction')}
      title={title}
      shouldShowCancel
      onCancel={onCancel}
      onSubmit={this.onPasscodeEntered}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscodeContainer);
