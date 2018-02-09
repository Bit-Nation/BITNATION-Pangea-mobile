import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationCreateScreen from './NationCreateScreen';
import {
  resetNationCreation,
  nationFieldChange,
  cancelNationCreation,
} from '../../actions/modifyNation';
import i18n from '../../global/i18n';
import { Alert } from 'react-native';

class NationCreateContainer extends Component {

  render() {
    return (
      <NationCreateScreen
        {...this.props}
        onCancelNationCreation={this._cancelNationCreation}
        onResetNationCreation={this._resetNationCreation}
      />
    );
  }

  _cancelNationCreation = () => {
    this.props.navigator.dismissModal().then(() => {
      this.props.onCancelNationCreation();
    });
  };

  _resetNationCreation = () => {
    Alert.alert(
      i18n.t('alerts.resetForm.title'), i18n.t('alerts.resetForm.subtitle'),
      [
        { text: i18n.t('alerts.resetForm.cancel'), style: 'cancel' },
        {
          text: i18n.t('alerts.resetForm.confirm'),
          onPress: () => this.props.onResetNationCreation(),
        },
      ],
      { cancelable: false },
    );
  };

  _deleteForm() {
    Alert.alert(
      i18n.t('alerts.deleteForm.title'),
      i18n.t('alerts.deleteForm.subtitle'),
      [
        { text: i18n.t('alerts.deleteForm.cancel'), style: 'cancel' },
        { text: i18n.t('alerts.deleteForm.confirm'), onPress: () => this.props.onResetNationCreation },
      ],
      { cancelable: false },
    );
  }

  _saveForm() {
    Alert.alert(
      i18n.t('alerts.saveForm.title'),
      i18n.t('alerts.saveForm.subtitle'),
      [
        { text: i18n.t('alerts.saveForm.cancel'), style: 'cancel' },
        { text: i18n.t('alerts.saveForm.confirm'), onPress: () => this.props.onResetNationCreation },
      ],
      { cancelable: false },
    );
  }

  _submitForm() {
    Alert.alert(
      i18n.t('alerts.submitForm.title'),
      i18n.t('alerts.submitForm.subtitle'),
      [
        { text: i18n.t('alerts.submitForm.cancel'), style: 'cancel' },
        { text: i18n.t('alerts.submitForm.confirm'), onPress: () => this.props.onResetNationCreation },
      ],
      { cancelable: false },
    );
  }
}

NationCreateContainer.PropTypes = {
  navigator: PropTypes.object,
};

const mapStateToProps = state => ({
  ...state.modifyNation
});

const mapDispatchToProps = dispatch => ({
  onCancelNationCreation() {
    dispatch(cancelNationCreation());
  },
  onResetNationCreation() {
    dispatch(resetNationCreation());
  },
  onNationChange(field, data) {
    dispatch(nationFieldChange(field, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NationCreateContainer);