// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import EmptyProfileScreen from './EmptyProfile/index';
import ProfileScreen from './Profile/index';
import EditProfile from './EditProfile/index';
import {} from '../../../actions/accounts';
import BackgroundImage from '../../../components/common/BackgroundImage';
import { makeStep, resetSteps } from '../../../actions/testingMode';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import type { Account } from '../../../types/Account';
import styles from './EmptyProfile/styles';
import { getCurrentAccount } from '../../../reducers/accounts';

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
  account: Account,
  /**
   * @desc Flag that determines if testing mode is activated
   */
  testingModeActive: boolean,
  /**
   * @desc Function to start account edit
   */
  onStartAccountEditing: () => void,
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
   * @desc Function to complete account edit
   */
  onDoneAccountEditing: () => void,
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
  _onAccountFieldChanged = (field, value) => {
    this.props.onChangeEditingAccount(Object.assign({}, this.props.editingAccount, { [field]: value }));
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        {this.props.editingAccount !== null &&
          <EditProfile
            account={this.props.account}
            editingAccount={this.props.editingAccount}
            navigator={this.props.navigator}
            onAccountChanged={this._onAccountFieldChanged}
            onCancelEditing={this.props.onCancelAccountEditing}
            onDoneEditing={this.props.onDoneAccountEditing}
          />
        }
        {this.props.editingAccount == null &&
           <ProfileScreen
             account={this.props.account}
             navigator={this.props.navigator}
             onStartEditing={this.props.onStartAccountEditing}
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
  account: getCurrentAccount(state),
  editingAccount: state.accounts.editingAccount,
  testingModeActive: state.testingMode.isActive,
});

const mapDispatchToProps = dispatch => ({
  makeStepForTestingMode() {
    dispatch(makeStep());
  },
  resetStepsForTestingMode() {
    dispatch(resetSteps());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
