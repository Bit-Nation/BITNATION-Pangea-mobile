// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../types/ReactNativeNavigation';
import ConfirmationScreen from './ConfirmationScreen';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to return the Promise resolve
   */
  onSuccess: (number) => null,
  /**
   * @desc Function to return the Promise reject
   */
  onFail: () => null,
}

type State = {
  gasPrice: number,
}

class ConfirmationContainer extends Component<Props, State> {
  static defaultProps: Object;
  cancelConfirmation = () => {
    this.props.onFail();
    this.props.navigator.dismissModal();
  };

  sendConfirmation = (gasPrice) => {
    this.props.onSuccess(gasPrice);
    this.props.navigator.dismissModal();
  };
  render() {
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
