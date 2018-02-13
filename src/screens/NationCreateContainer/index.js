import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationCreateScreen from './NationCreateScreen';
import { resetNationCreation, nationFieldChange, cancelNationCreation, createNation } from '../../actions/createNation';
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
  ...state.createNation
});

const mapDispatchToProps = dispatch => ({
  onCancelNationCreation() {
    dispatch(cancelNationCreation());
  },
  onCreateNation(nationData, navigator) {
    dispatch(createNation(nationData, navigator));
  },
  onResetNationCreation() {
    dispatch(resetNationCreation());
  },
  onNationChange(field, data) {
    console.log('nationFieldChange: ');
    dispatch(nationFieldChange(field, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NationCreateContainer);