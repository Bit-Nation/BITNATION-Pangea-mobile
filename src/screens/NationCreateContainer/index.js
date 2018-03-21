// @flow

import React, { Component } from 'react';
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
import { errorAlert, alert } from '../../global/alerts';
import { nationIsModified } from '../../reducers/modifyNation';
import type {
  EditingNationType,
  NationIdType,
} from '../../types/Nation';

type Props = {
  navigator: Object,
  editingNation: EditingNationType,
  latestError: Error,
  initialNation: EditingNationType,
}

type Actions = {
  onSaveNationDraft: (EditingNationType, () => void) => void,
  onResetNationCreation: () => void,
  onDeleteNationDraft: (NationIdType, () => void) => void,
  onSubmitNation: (EditingNationType, () => void) => void,
};

class NationCreateContainer extends Component<Props & Actions> {
  static defaultProps: Object;
  cancelNationCreation = () => {
    const isModified = nationIsModified(this.props);

    if (!isModified) {
      this.props.navigator.dismissModal();
      return;
    }

    alert('saveFormOnCancel', [
      {
        name: 'cancel',
        style: 'cancel',
        onPress: () => this.props.navigator.dismissModal(),
      }, {
        name: 'save',
        onPress: () => {
          this.props.onSaveNationDraft(this.props.editingNation, () => {
            if (this.props.latestError) {
              errorAlert(this.props.latestError);
              return;
            }

            this.props.navigator.dismissModal();
          });
        },
      }]);
  };

  resetNationCreation = () => {
    alert('resetForm', [
      {
        name: 'cancel',
        style: 'cancel',
      }, {
        name: 'confirm',
        onPress: () => this.props.onResetNationCreation(),
      }]);
  };

  deleteForm = () => {
    alert('deleteForm', [
      {
        name: 'cancel',
        style: 'cancel',
      }, {
        name: 'delete',
        style: 'destructive',
        onPress: () => this.props.onDeleteNationDraft(this.props.initialNation.id, () => {
          if (this.props.latestError) {
            errorAlert(this.props.latestError);
            return;
          }

          this.props.navigator.dismissModal();
        }),
      }]);
  };

  saveForm = () => {
    this.props.onSaveNationDraft(this.props.editingNation, () => {
      if (this.props.latestError) {
        errorAlert(this.props.latestError);
        return;
      }

      alert('saveForm', [
        {
          name: 'continue',
        }, {
          name: 'close',
          onPress: () => this.props.navigator.dismissModal(),
        }]);
    });
  };

  submitForm = () => {
    alert('submitForm', [
      {
        name: 'cancel',
        style: 'cancel',
      }, {
        name: 'confirm',
        onPress: () => this.props.onSubmitNation(this.props.editingNation, () => {
          if (this.props.latestError) {
            errorAlert(this.props.latestError);
            return;
          }

          this.props.navigator.dismissModal();
        }),
      }]);
  };

  render() {
    return (
      <NationCreateScreen
        {...this.props}
        onCancelNationCreation={this.cancelNationCreation}
        onResetNationCreation={this.resetNationCreation}
        onSaveNationDraft={this.saveForm}
        onDeleteNationDraft={this.deleteForm}
        onSubmitNation={this.submitForm}
      />
    );
  }
}

NationCreateContainer.defaultProps = {
  navigator: null,
  latestError: null,
  initialNation: null,
  onSaveNationDraft: () => null,
  editingNation: null,
  onResetNationCreation: () => null,
  onDeleteNationDraft: () => null,
  onSubmitNation: () => null,
};

const mapStateToProps = state => ({
  ...state.modifyNation,
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
  onSaveNationDraft(data, callback) {
    dispatch(saveNationDraft(data, callback));
  },
  onDeleteNationDraft(nationId, callback) {
    dispatch(deleteNationDraft(nationId, callback));
  },
  onSubmitNation(data, callback) {
    dispatch(submitNation(data, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NationCreateContainer);
