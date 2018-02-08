import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationCreateScreen from './NationCreateScreen';
import { cancelNationCreation, createNation, resetNationCreation } from '../../actions/nations';
import i18n from "../../global/i18n";

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
  /// PUT ...state.createNation there
});

const mapDispatchToProps = dispatch => ({
  onCancelNationCreation() {
    dispatch(cancelNationCreation());
  },
  onCreateNation(nationData, navigator) {
    dispatch(createNation(nationData, navigator));
  },
  onResetNationCreation() {
    console.log('reset nation: ');
    dispatch(resetNationCreation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NationCreateContainer);