// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import PinCodeScreen from './PinCode/index';
import { type State as SettingsState } from '../../reducers/settings';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import i18n from '../../global/i18n';
import { checkPinCode, checkPassword } from '../../actions/accounts';
import { errorAlert } from '../../global/alerts';
import PasswordScreen from './Password/index';
import styles from './PinCode/styles';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import ScreenTitle from '../../components/common/ScreenTitle';

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
}

class EnterPasscodeContainer extends NavigatorComponent<Props & Actions & SettingsState> {
  onCheckFinished = (success: boolean) => {
    if (success === true) {
      this.props.onSuccess();
      return;
    }

    if (this.props.passcodeInfo.type === 'pinCode') {
      errorAlert(i18n.t('error.invalidPinCode'));
    } else {
      errorAlert(i18n.t('error.invalidPassword'));
    }
  };

  renderPasscodeScreen() {
    const {
      navigator, passcodeInfo, title, onCancel, accountId,
    } = this.props;
    if (passcodeInfo.type === 'pinCode') {
      return (<PinCodeScreen
        navigator={navigator}
        pinCodeLength={passcodeInfo.length}
        instruction={i18n.t('screens.pinCode.enterInstruction')}
        title={title}
        shouldShowCancel
        onCancel={onCancel}
        onSubmit={pinCode => this.props.checkPinCode(pinCode, accountId, this.onCheckFinished)}
      />);
    }

    return (<PasswordScreen
      navigator={navigator}
      instruction={i18n.t('screens.password.enterInstruction')}
      title={title}
      shouldShowCancel
      onCancel={onCancel}
      onSubmit={password => this.props.checkPassword(password, accountId, this.onCheckFinished)}
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

const mapStateToProps = state => ({
  ...state.settings,
});

const mapDispatchToProps = dispatch => ({
  checkPinCode(pinCode, accountId, callback) {
    dispatch(checkPinCode(pinCode, accountId, callback));
  },
  checkPassword(password, accountId, callback) {
    dispatch(checkPassword(password, accountId, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscodeContainer);
