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
import { errorAlert, alert } from '../../global/alerts';
import { nationIsModified } from '../../reducers/modifyNation';

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
      }],
    );
  };

  _resetNationCreation = () => {
    alert('resetForm', [
      {
        name: 'cancel',
        style: 'cancel',
      }, {
        name: 'confirm',
        onPress: () => this.props.onResetNationCreation(),
      }],
    );
  };

  _deleteForm = () => {
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
      }],
    );
  };

  _saveForm = () => {
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
        }],
      );
    });
  };

  _submitForm = () => {
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
      }],
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