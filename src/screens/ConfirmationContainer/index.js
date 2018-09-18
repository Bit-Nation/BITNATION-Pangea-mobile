// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../types/ReactNativeNavigation';
import ConfirmationScreen from './ConfirmationScreen';
import { CancelledError } from '../../global/errors/common';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to return the Promise resolve
   * @param number gasPrice parameter to specify the gas price in gwei
   * @param string gasLimit parameter to specify the maximum amount of gas the user is willing to spend
   */
  onSuccess: (gasPrice: number, gasLimit: string) => null,
  /**
   * @desc Function to return the Promise reject
   */
  onFail: (error: Error) => null,
  /**
   * @desc Properties of the transaction
   */
  to: string,
  from: string,
  amount: string,
  estimate: string,
  purpose: string,
  app: string,
  gasLimit: string,
}

type State = {
  gasPrice: number,
  gasLimit: string,
}

class ConfirmationContainer extends Component<Props, State> {
  static defaultProps: Object;
  cancelConfirmation = async () => {
    await this.props.navigator.dismissModal();
    this.props.onFail(new CancelledError());
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
  gasLimit: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationContainer);
