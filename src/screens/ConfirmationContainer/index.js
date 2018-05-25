// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../types/ReactNativeNavigation';
import {
  cancelConfirmation,
  sendConfirmation,
} from '../../actions/confirmation';
import ConfirmationScreen from './ConfirmationScreen';

type Props = {
  navigator: Navigator,
}

type Actions = {

};

class ConfirmationContainer extends Component<Props & Actions> {
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
