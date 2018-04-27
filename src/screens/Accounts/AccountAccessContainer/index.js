// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import { openNation } from '../../../actions/nations';
import AccountAccessListScreen from './AccountAccessListScreen';
import type { Account } from '../../../types/Account';
import { screen } from '../../../global/Screens';
import type { createAccount, resetAccount } from '../../../actions/accounts';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to open a nation
   * @param id Id of the nation to be opened
   */
  selectedAccount: (id: number) => void,
  /**
   * @desc Function to open an account
   * @param id Index of the account selected
   */
  openAccount: (Account) => void,
};

class AccountAccessContainer extends NavigatorComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: [],
    });
  }

  createAccount = () => {
    this.props.navigator.showModal(screen('ACCOUNT_CREATE_SCREEN'));
  };
  resetAccount = () => {
    this.props.navigator.showModal(screen('RESET_CREATE_SCREEN'));
  };
  render() {
    return (
      <AccountAccessListScreen
        onSelectItem={this.onSelectItem}
        onCreateAccount={this.createAccount}
        onResetAccount={this.resetAccount}
        {...this.props}
      />
    );
  }
}

AccountAccessContainer.defaultProps = {
  onCreateAccount: () => null,
};

const mapStateToProps = state => ({
  ...state.accounts,
});

const mapDispatchToProps = dispatch => ({
  openAccount(id) {
    dispatch(openNation(id));
  },
  onCreateAccount() {
    dispatch(createAccount());
  },
  onResetAccount() {
    dispatch(resetAccount());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountAccessContainer);
