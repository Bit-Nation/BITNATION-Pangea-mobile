// @flow

import React from 'react';
import { connect } from 'react-redux';
import PinCodeScreen from './PinCode/index';
import { type State as SettingsState } from '../../reducers/settings';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import i18n from '../../global/i18n';
import { checkPinCode } from '../../actions/accounts';
import { errorAlert } from '../../global/alerts';

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
}

class EnterPasscodeContainer extends NavigatorComponent<Props & Actions & SettingsState> {
  onCheckFinished = (success: boolean) => {
    if (success === true) {
      this.props.onSuccess();
      return;
    }

    errorAlert(i18n.t('error.invalidPinCode'));
  };

  render() {
    const {
      navigator, passcodeInfo, title, onCancel,
    } = this.props;

    return (
      passcodeInfo.type === 'pinCode' &&
      <PinCodeScreen
        navigator={navigator}
        pinCodeLength={passcodeInfo.length}
        instruction={i18n.t('screens.pinCode.enterInstruction')}
        title={title}
        shouldShowCancel
        onCancel={onCancel}
        onSubmit={pinCode => this.props.checkPinCode(pinCode, this.onCheckFinished)}
      />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscodeContainer);
