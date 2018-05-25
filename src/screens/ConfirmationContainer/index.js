// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../types/ReactNativeNavigation';
import {
  cancelConfirmation,
  sendConfirmation,
} from '../../actions/confirmation';
import ConfirmationScreen from './ConfirmationScreen';
import { type State as ConfirmationState } from '../../reducers/confirmation';

type Props = {
  navigator: Navigator,
}

type Actions = {
  onCancelConfirmation: () => void,
  onSendConfirmation: () => void,
};

class ConfirmationContainer extends Component<Props & Actions & ConfirmationState> {
  static defaultProps: Object;
  cancelConfirmation = () => {
    this.props.navigator.dismissModal();
  };

  sendConfirmation = () => {
  };
  render() {
    return (
      <ConfirmationScreen
        {...this.props}
        onCancelConfirmation={this.cancelConfirmation}
        onSendConfirmation={this.sendConfirmation}
      />
    );
  }
}

ConfirmationContainer.defaultProps = {
  gasPrice: 2,
  onCancelConfirmation: () => null,
  onSendConfirmation: () => null,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  onCancelConfirmation() {
    dispatch(cancelConfirmation());
  },
  onSendConfirmation() {
    dispatch(sendConfirmation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationContainer);
