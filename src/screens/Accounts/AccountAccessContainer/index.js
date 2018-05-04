// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import { openNation } from '../../../actions/nations';
import AccountAccessListScreen from './AccountAccessListScreen';
import { screen } from '../../../global/Screens';
import { startAccountCreation, startRestoreAccountUsingMnemonic } from '../../../actions/accounts';
import { type State as AccountState } from '../../../reducers/accounts';
import type { Mnemonic } from '../../../types/Mnemonic';
import AccountsScreen from '../index';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to open an account
   * @param id Index of the account selected
   */
  openAccount: (id: string) => void,
};

type Actions = {
  /**
   * @desc Action to start account process.
   */
  startAccountCreation: () => void,
  /**
   * @desc Action to restore account with mnemonic.
   * @param {Mnemonic} mnemonic Mnemonic to be used.
   */
  startRestoreAccountUsingMnemonic: (mnemonic: Mnemonic) => void
}

class AccountAccessContainer extends NavigatorComponent<Props & Actions & AccountState> {
  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: [],
    });
  }

  onSelectItem = (id) => {
    // @todo Update settings to show pin code or password.

    this.props.navigator.showModal({
      ...screen('ENTER_PASSCODE_SCREEN'),
      passProps: {
        accountId: id,
        onCancel: () => this.props.navigator.dismissModal(),
      },
    });
  };
  render() {
    return (
      <AccountAccessListScreen
        onSelectItem={this.onSelectItem}
        onCreateAccount={() => AccountsScreen.onCreateAccount(this.props.navigator, this.props.startAccountCreation)}
        onRestoreAccount={() => AccountsScreen.onRestoreAccount(this.props.navigator, this.props.startRestoreAccountUsingMnemonic)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.accounts,
});

const mapDispatchToProps = dispatch => ({
  openAccount(id) {
    dispatch(openNation(id));
  },
  startAccountCreation() {
    dispatch(startAccountCreation());
  },
  startRestoreAccountUsingMnemonic(mnemonic) {
    dispatch(startRestoreAccountUsingMnemonic(mnemonic));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountAccessContainer);
