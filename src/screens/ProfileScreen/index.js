import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import EmptyProfileScreen from './EmptyProfile';
import ProfileScreen from './Profile';
import EditProfile from './EditProfile';
import {
  startUserEditing,
  changeEditingUser,
  cancelUserEditing,
  doneUserEditing, startUserCreating,
  requestProfileUpdate,
  getUserProfile,
} from '../../actions/profile';
import BackgroundImage from '../../components/common/BackgroundImage';
import { makeStep, resetSteps } from '../../actions/testingMode';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.props.getUserProfile();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage/>
        {
          this.props.editingUser ?
            <EditProfile user={this.props.user}
                         editingUser={this.props.editingUser}
                         navigator={this.props.navigator}
                         onUserChanged={this._onUserFieldChanged}
                         onCancelEditing={this.props.onCancelUserEditing}
                         onDoneEditing={this.props.onDoneUserEditing}/>
            :
            this.props.user ?
              <ProfileScreen user={this.props.user}
                             navigator={this.props.navigator}
                             onStartEditing={this.props.onStartUserEditing}
                             makeStepForTestingMode={this.props.makeStepForTestingMode}
                             resetStepsForTestingMode={this.props.resetStepsForTestingMode}
                             testingModeActive={this.props.testingModeActive}/>
              :
              <EmptyProfileScreen onCreateUserProfile={this._onCreateUserProfile}
                                  navigator={this.props.navigator}/>
        }
      </View>
    );
  }

  _onCreateUserProfile = () => {
    this.props.onStartUserCreating();
  };

  _onUserFieldChanged = (field, value) => {
    this.props.onChangeEditingUser(Object.assign({}, this.props.editingUser, { [field]: value }));
  };

}

ProfileContainer.propTypes = {
  user: PropTypes.object,
  editingUser: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.profile.user,
    editingUser: state.profile.editingUser,
    testingModeActive: state.testingMode.isActive,
  };
};

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
