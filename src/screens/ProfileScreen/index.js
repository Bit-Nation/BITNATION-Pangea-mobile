import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyProfileScreen from './EmptyProfile';
import ProfileScreen from './Profile';

class ProfileContainer extends Component {

  render() {
    return (
      this.props.user ?
        <ProfileScreen user={this.props.user}/> :
        <EmptyProfileScreen onCreateUserProfile={this._onCreateUserProfile}/>
    );
  }

  _onCreateUserProfile = () => {
  };

}

ProfileContainer.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    user: state.profile.user,
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
