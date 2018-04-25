// @flow

import React from 'react';
import { connect } from 'react-redux';
import PinCodeScreen from './PinCode/index';
import { type State as SettingsState } from '../../reducers/settings';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import i18n from '../../global/i18n';
import { checkPinCode, checkPassword } from '../../actions/accounts';
import { errorAlert } from '../../global/alerts';
import EnterPasswordScreen from './Password/EnterPassword';

type Props = {
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
}

type Actions = {
  /**
   * @desc Check entered pin code.
   */
  checkPinCode: (pinCode: string, callback: (success: boolean) => void) => void,
  /**
   * @desc Check entered password.
   */
  checkPassword: (password: string, callback: (success: boolean) => void) => void,
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

  render() {
    const {
      navigator, passcodeInfo, title, onCancel,
    } = this.props;

    return (
      (passcodeInfo.type === 'pinCode' &&
      <PinCodeScreen
        navigator={navigator}
        pinCodeLength={passcodeInfo.length}
        instruction={i18n.t('screens.pinCode.enterInstruction')}
        title={title}
        shouldShowCancel
        onCancel={onCancel}
        onSubmit={pinCode => this.props.checkPinCode(pinCode, this.onCheckFinished)}
      />)
      ||
      (passcodeInfo.type === 'password' &&
      <EnterPasswordScreen
        navigator={navigator}
        instruction={i18n.t('screens.password.enterInstruction')}
        title={title}
        shouldShowCancel
        onCancel={onCancel}
        onSubmit={password => this.props.checkPassword(password, this.onCheckFinished)}
      />
      )
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
});

const mapDispatchToProps = dispatch => ({
  checkPinCode(pinCode, callback) {
    dispatch(checkPinCode(pinCode, callback));
  },
  checkPassword(password, callback) {
    dispatch(checkPassword(password, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscodeContainer);
