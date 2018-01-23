import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationCreateScreen from './NationCreateScreen';
import { cancelNationCreation, createNation } from '../../actions/nations';

class NationCreateContainer extends Component {

  render() {
    return (
      <NationCreateScreen {...this.props}/>
    );
  }

}

NationCreateContainer.PropTypes = {
  navigator: PropTypes.object
};

const mapStateToProps = state => ({
  ...state.nations,
});

const mapDispatchToProps = dispatch => ({
  onCancelNationCreation() {
    dispatch(cancelNationCreation());
  },
  onCreateNation(nationData, navigator) {
    dispatch(createNation(nationData, navigator));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NationCreateContainer);