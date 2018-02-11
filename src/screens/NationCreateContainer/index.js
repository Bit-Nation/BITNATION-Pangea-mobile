import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationCreateScreen from './NationCreateScreen';
import {
  resetNationCreation,
  editingNationFieldChange,
  cancelNationCreation,
  saveNationDraft,
  deleteNationDraft,
  submitNation,
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
        onSaveNationDraft={this._saveForm}
        onDeleteNationDraft={this._deleteForm}
        onSubmitNation={this._submitForm}
      />
    );
  }

  _cancelNationCreation = () => {
    const isModified = !_.isEqual(this.props.editingNation, this.props.initialNation);

    if (isModified) {
      Alert.alert(
        i18n.t('alerts.saveFormOnCancel.title'), i18n.t('alerts.saveFormOnCancel.subtitle'),
        [
          { text: i18n.t('alerts.saveFormOnCancel.cancel'), style: 'cancel', onPress: () => this.props.navigator.dismissModal() },
          {
            text: i18n.t('alerts.saveFormOnCancel.save'),
            onPress: () => this.props.navigator.dismissModal().then(() => {
              this.props.onSaveNationDraft();
            }),
          },
        ],
        { cancelable: false },
      );
    } else {
      this.props.navigator.dismissModal();
    }
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

  _deleteForm = () => {
    Alert.alert(
      i18n.t('alerts.deleteForm.title'),
      i18n.t('alerts.deleteForm.subtitle'),
      [
        { text: i18n.t('alerts.deleteForm.cancel'), style: 'cancel' },
        { text: i18n.t('alerts.deleteForm.delete'), onPress: () => this.props.navigator.dismissModal().then(() => {
            this.props.onDeleteNationDraft();
          }) },
      ],
      { cancelable: false },
    );
  };

  _saveForm = () => {
    //TODO Need to execute onSaveNationDraft action before show the Alert
    Alert.alert(
      i18n.t('alerts.saveForm.title'),
      i18n.t('alerts.saveForm.subtitle'),
      [
        { text: i18n.t('alerts.saveForm.continue'), style: 'cancel' },
        { text: i18n.t('alerts.saveForm.close'), onPress: () => this.props.navigator.dismissModal() },
      ],
      { cancelable: false },
    );
  };

  _submitForm = () => {
    Alert.alert(
      i18n.t('alerts.submitForm.title'),
      i18n.t('alerts.submitForm.subtitle'),
      [
        { text: i18n.t('alerts.submitForm.cancel'), style: 'cancel' },
        { text: i18n.t('alerts.submitForm.confirm'), onPress: () => this.props.onSubmitNation },
      ],
      { cancelable: false },
    );
  };
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
    dispatch(editingNationFieldChange(field, data));
  },
  onSaveNationDraft(data) {
    dispatch(saveNationDraft(data));
  },
  onDeleteNationDraft() {
    dispatch(deleteNationDraft(data));
  },
  onSubmitNation() {
    dispatch(submitNation(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NationCreateContainer);