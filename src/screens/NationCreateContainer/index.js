import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationCreateScreen from './NationCreateScreen';
import { resetNationCreation, nationFieldChange, cancelNationCreation, createNation } from '../../actions/createNation';
import i18n from "../../global/i18n";
import {Alert} from "react-native";

class NationCreateContainer extends Component {

  render() {
    return (
      <NationCreateScreen {...this.props}/>
    );
  }

  _deleteForm () {
    Alert.alert(
      i18n.t('alerts.deleteForm.title'),
      i18n.t('alerts.deleteForm.subtitle'),
      [
        {text: i18n.t('alerts.deleteForm.cancel'), style: 'cancel'},
        {text: i18n.t('alerts.deleteForm.confirm'), onPress: () => this.props.onResetNationCreation},
      ],
      { cancelable: false },
    )
  }

  _saveForm () {
    Alert.alert(
      i18n.t('alerts.saveForm.title'),
      i18n.t('alerts.saveForm.subtitle'),
      [
        {text: i18n.t('alerts.saveForm.cancel'), style: 'cancel'},
        {text: i18n.t('alerts.saveForm.confirm'), onPress: () => this.props.onResetNationCreation},
      ],
      { cancelable: false },
    )
  }

  _submitForm () {
    Alert.alert(
      i18n.t('alerts.submitForm.title'),
      i18n.t('alerts.submitForm.subtitle'),
      [
        {text: i18n.t('alerts.submitForm.cancel'), style: 'cancel'},
        {text: i18n.t('alerts.submitForm.confirm'), onPress: () => this.props.onResetNationCreation},
      ],
      { cancelable: false },
    )
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
    Alert.alert(
      i18n.t('alerts.resetForm.title'), i18n.t('alerts.resetForm.subtitle'),
      [ {text: i18n.t('alerts.resetForm.cancel'), style: 'cancel'},
        {text: i18n.t('alerts.resetForm.confirm'), onPress: () => dispatch(resetNationCreation())}, ], { cancelable: false },
    );
  },
  onNationChange(field, data) {
    console.log('nationFieldChange: ');
    dispatch(nationFieldChange(field, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NationCreateContainer);