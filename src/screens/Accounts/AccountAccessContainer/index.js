// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import { openNation } from '../../../actions/nations';
import AccountAccessListScreen from './AccountAccessListScreen';
import { screen } from '../../../global/Screens';
import { createAccount, resetAccount } from '../../../actions/accounts';
import { type State as AccountState } from '../../../reducers/nations';

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
  openAccount: (id: string) => void,
  /**
   * @desc Function to select specific account.
   * @param {any} id Id of selected item.
   */
  onSelectItem: (id: any) => void,
};

class AccountAccessContainer extends NavigatorComponent<Props & AccountState> {
  constructor(props) {
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
  onSelectItem = (id) => {
    // const account = resolveNation(this.props.accounts, id);

    // if (!account) {
    //  return;
    // }

    this.props.openAccount(id);

    this.props.navigator.push(screen('LOGIN_ACCOUNT_SCREEN'));
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
