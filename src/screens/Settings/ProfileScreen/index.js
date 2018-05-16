// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';

import ProfileScreen from './Profile/index';
import EditProfile from './EditProfile/index';
import { changeCreatingAccountField, saveCreatingAccount } from '../../../actions/accounts';
import BackgroundImage from '../../../components/common/BackgroundImage';
import { makeStep, resetSteps } from '../../../actions/testingMode';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import type { Account } from '../../../types/Account';
import styles from './EmptyProfile/styles';
import { type State as AccountsState, getCurrentAccount, isCreatingAccount } from '../../../reducers/accounts';
import {
  cancelAccountEditing, changeEditingAccount, doneAccountEditing,
  startAccountEditing, saveEditingAccount,
} from '../../../actions/profile';
import { screen } from '../../../global/Screens';
import i18n from '../../../global/i18n';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Account object that is currently being edited
   */
  editingAccount: Account | null,
  /**
   * @desc Current account object
   */
  account: Account | null,
  /**
   * @desc The whole accounts Redux state object.
   */
  accountsState: AccountsState,
  /**
   * @desc Flag that determines if testing mode is activated
   */
  testingModeActive: boolean,
  /**
   * @desc Function to start account edit
   */
  onStartAccountEditing: (account: Account) => void,
  /**
   * @desc Function to cancel account edit
   */
  onCancelAccountEditing: () => void,
  /**
   * @desc Function to update editing account
   * @param account Modified account object
   */
  onChangeEditingAccount: (account: Account) => void,
  /**
   * @desc Function to update creating account.
   * @param {string} field Name of field to be changed.
   * @param {any} value New value of specified field.
   */
  changeCreatingAccountField: (field: string, value: any) => void,
  /**
   * @desc Function to finish account creation.
   * @desc {Function} Callback on saving finished.
   */
  doneAccountCreation: (callback: (boolean) => void) => void,
  /**
   * @desc Function to complete account edit
   */
  onDoneAccountEditing: (editingAccount: Account) => void,
  /**
   * @desc Function to enable testing mode
   */
  makeStepForTestingMode: () => void,
  /**
   * @desc Function to reset in testing mode
   */
  resetStepsForTestingMode: () => void,
};

class ProfileContainer extends Component<Props> {
  onAccountFieldChanged = (field, value) => {
    const isCreating = isCreatingAccount(this.props.accountsState);
    if (isCreating) {
      this.props.changeCreatingAccountField(field, value);
    }
    this.props.onChangeEditingAccount({
      ...this.props.editingAccount,
      [field]: value,
    });
  };

  onCancelEditTapped = () => {
    const isCreating = isCreatingAccount(this.props.accountsState);
    if (isCreating === true) {
      this.props.navigator.pop();
    } else {
      this.props.onCancelAccountEditing();
    }
  };

  onDoneEditTapped = () => {
    const { editingAccount } = this.props;
    if (editingAccount == null) {
      return;
    }

    const isCreating = isCreatingAccount(this.props.accountsState);
    if (isCreating === true) {
      this.props.doneAccountCreation((success) => {
        if (success === false) {
          Alert.alert(i18n.t('error.accountCreationFailed'));
          return;
        }

        this.props.navigator.push(screen('ACCOUNT_CREATE_READY'));
      });
    } else {
      this.props.onDoneAccountEditing(editingAccount);
    }
  };

  render() {
    const { creatingAccount, editingAccount } = this.props.accountsState;
    const { account } = this.props;
    const currentAccount = (account || creatingAccount);
    if (currentAccount == null) {
      return (<View />);
    }
    const isCreating = isCreatingAccount(this.props.accountsState);

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        {
          editingAccount !== null &&
          <EditProfile
            account={currentAccount}
            editingAccount={editingAccount}
            navigator={this.props.navigator}
            onAccountChanged={this.onAccountFieldChanged}
            onCancelEditing={this.onCancelEditTapped}
            onDoneEditing={this.onDoneEditTapped}
            isCreating={isCreating}
          />
        }
        {
          editingAccount == null && account != null &&
          <ProfileScreen
            account={account}
            navigator={this.props.navigator}
            onStartEditing={() => this.props.onStartAccountEditing(account)}
            makeStepForTestingMode={this.props.makeStepForTestingMode}
            resetStepsForTestingMode={this.props.resetStepsForTestingMode}
            testingModeActive={this.props.testingModeActive}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  accountsState: state.accounts,
  account: getCurrentAccount(state.accounts),
  editingAccount: state.accounts.editingAccount,
  testingModeActive: state.testingMode.isActive,
});

const mapDispatchToProps = dispatch => ({
  onStartAccountEditing(account: Account) {
    dispatch(startAccountEditing(account));
  },
  onCancelAccountEditing() {
    dispatch(cancelAccountEditing());
  },
  onChangeEditingAccount(account: Account) {
    dispatch(changeEditingAccount(account));
  },
  changeCreatingAccountField(field, value) {
    dispatch(changeCreatingAccountField(field, value));
  },
  doneAccountCreation(callback) {
    dispatch(saveCreatingAccount(callback));
  },
  onDoneAccountEditing(account: Account) {
    dispatch(saveEditingAccount(account));
    dispatch(doneAccountEditing());
  },
  makeStepForTestingMode() {
    dispatch(makeStep());
  },
  resetStepsForTestingMode() {
    dispatch(resetSteps());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
