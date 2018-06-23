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
  cancelConfirmation = async () => {
    await this.props.navigator.dismissModal();
    this.props.onFail();
  };

  sendConfirmation = async (gasPrice) => {
    await this.props.navigator.dismissModal();
    this.props.onSuccess(gasPrice);
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
