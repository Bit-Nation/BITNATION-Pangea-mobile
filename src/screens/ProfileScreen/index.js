// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import EmptyProfileScreen from './EmptyProfile';
import ProfileScreen from './Profile';
import EditProfile from './EditProfile';
import {
  startUserEditing,
  changeEditingUser,
  cancelUserEditing,
  startUserCreating,
  requestProfileUpdate,
  getUserProfile,
} from '../../actions/profile';
import BackgroundImage from '../../components/common/BackgroundImage';
import { makeStep, resetSteps } from '../../actions/testingMode';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import type { Navigator } from '../../types/ReactNativeNavigation';
import type { ProfileType } from '../../types/Profile';
import styles from './EmptyProfile/styles';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc User object that is currently being edited
   */
  editingUser: ProfileType,
  /**
   * @desc Current user object
   */
  user: ProfileType,
  /**
   * @desc Flag that determines if testing mode is activated
   */
  testingModeActive: boolean,
  /**
   * @desc Function to start user create
   */
  onStartUserCreating: () => void,
  /**
   * @desc Function to start user edit
   */
  onStartUserEditing: () => void,
  /**
   * @desc Function to cancel user edit
   */
  onCancelUserEditing: () => void,
  /**
   * @desc Function to update editing user
   * @param user Modified user object
   */
  onChangeEditingUser: (user: ProfileType) => void,
  /**
   * @desc Function to complete user edit
   */
  onDoneUserEditing: () => void,
  /**
   * @desc Function to fetch user profile
   */
  getUserProfile: () => void,
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
  constructor(props: Props) {
    super(props);
    this.props.getUserProfile();
  }

  _onCreateUserProfile = () => {
    this.props.onStartUserCreating();
  };

  _onUserFieldChanged = (field, value) => {
    this.props.onChangeEditingUser(Object.assign({}, this.props.editingUser, { [field]: value }));
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        {this.props.editingUser !== null &&
          <EditProfile
            user={this.props.user}
            editingUser={this.props.editingUser}
            navigator={this.props.navigator}
            onUserChanged={this._onUserFieldChanged}
            onCancelEditing={this.props.onCancelUserEditing}
            onDoneEditing={this.props.onDoneUserEditing}
          />
        }
        {this.props.editingUser == null &&
         (this.props.user ?
           <ProfileScreen
             user={this.props.user}
             navigator={this.props.navigator}
             onStartEditing={this.props.onStartUserEditing}
             makeStepForTestingMode={this.props.makeStepForTestingMode}
             resetStepsForTestingMode={this.props.resetStepsForTestingMode}
             testingModeActive={this.props.testingModeActive}
           />
            : <EmptyProfileScreen
              onCreateUserProfile={this._onCreateUserProfile}
              navigator={this.props.navigator}
            />)
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profile.user,
  editingUser: state.profile.editingUser,
  testingModeActive: state.testingMode.isActive,
});

const mapDispatchToProps = dispatch => ({
  onStartUserCreating() {
    dispatch(startUserCreating());
  },
  onStartUserEditing() {
    dispatch(startUserEditing());
  },
  onCancelUserEditing() {
    dispatch(cancelUserEditing());
  },
  onChangeEditingUser(user) {
    dispatch(changeEditingUser(user));
  },
  onDoneUserEditing() {
    dispatch(requestProfileUpdate());
  },
  getUserProfile() {
    dispatch(getUserProfile());
  },
  makeStepForTestingMode() {
    dispatch(makeStep());
  },
  resetStepsForTestingMode() {
    dispatch(resetSteps());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
