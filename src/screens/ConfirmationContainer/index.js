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
  onSuccess: (number, number) => null,
  /**
   * @desc Function to return the Promise reject
   */
  onFail: () => null,
  /**
   * @desc Properties of the transaction
   */
  to: String,
  from: String,
  amount: String,
  estimate: String,
  purpose: String,
  app: String
}

type State = {
  gasPrice: number,
  gasLimit: number,
}

class ConfirmationContainer extends Component<Props, State> {
  static defaultProps: Object;
  cancelConfirmation = async () => {
    await this.props.navigator.dismissModal();
    this.props.onFail();
  };

  sendConfirmation = async (gasPrice, gasLimit) => {
    await this.props.navigator.dismissModal();
    this.props.onSuccess(gasPrice, gasLimit);
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
  to: '0x0',
  from: '0x0',
  amount: '0',
  estimate: '0',
  purpose: '',
  app: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationContainer);
