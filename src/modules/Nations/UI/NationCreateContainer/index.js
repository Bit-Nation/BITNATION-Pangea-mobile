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
} from '../../modifyNation-actions';
import { errorAlert, alert } from 'pangea-common/alerts';
import { nationIsModified, type State as ModifyNationState } from '../../modifyNation-reducers';
import type {
  EditingNationType,
  NationIdType,
} from '../../Nation-types.js';
import type { Navigator } from '../../types/ReactNativeNavigation';

type Props = {
  navigator: Navigator,
}

type Actions = {
  onSaveNationDraft: (EditingNationType, () => void) => void,
  onResetNationCreation: () => void,
  onDeleteNationDraft: (NationIdType, () => void) => void,
  onSubmitNation: (EditingNationType, () => void) => void,
  onNationChange: (EditingNationType, () => void) => void,
};

class NationCreateContainer extends Component<Props & Actions & ModifyNationState> {
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
          if (this.props.editingNation === null) return;

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
        onPress: () => {
          if (this.props.initialNation === null) return;
          if (this.props.initialNation.id == null) return;

          this.props.onDeleteNationDraft(this.props.initialNation.id, () => {
            if (this.props.latestError) {
              errorAlert(this.props.latestError);
              return;
            }

            this.props.navigator.dismissModal();
          });
        },
      }]);
  };

  saveForm = () => {
    if (this.props.editingNation === null) return;

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
        onPress: () => {
          if (this.props.editingNation === null) return;

          this.props.onSubmitNation(this.props.editingNation, () => {
            if (this.props.latestError) {
              errorAlert(this.props.latestError);
              return;
            }

            this.props.navigator.dismissModal();
          });
        },
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
  latestError: null,
  initialNation: null,
  onSaveNationDraft: () => null,
  editingNation: null,
  onResetNationCreation: () => null,
  onDeleteNationDraft: () => null,
  onSubmitNation: () => null,
  onNationChange: () => null,
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
