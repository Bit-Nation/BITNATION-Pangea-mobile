// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../types/ReactNativeNavigation';
import ConfirmationScreen from './ConfirmationScreen';

type Props = {
  navigator: Navigator,
}

type State = {
  gasPrice: number,
}

class ConfirmationContainer extends Component<Props, State> {
  static defaultProps: Object;
  cancelConfirmation = () => {
    this.props.navigator.dismissModal();
  };

  sendConfirmation = () => {
  };
  render() {
    console.log('---> Props:', this.props);
    return (
      <ConfirmationScreen
        {...this.props}
        onFail={this.cancelConfirmation}
        onSuccess={this.sendConfirmation}
      />
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

ConfirmationScreen.defaultProps = {
  gasPrice: 2,
  onFail: () => null,
  onSuccess: () => null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationContainer);
