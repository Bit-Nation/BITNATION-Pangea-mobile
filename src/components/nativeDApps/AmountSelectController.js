/* eslint-disable no-use-before-define */
// @flow

import React, { Component } from 'react';
import type { InternalProps, Props } from './AmountSelect';
import AmountSelect from './AmountSelect';

export default class AmountSelectController extends Component<Props & InternalProps, *> {
  constructor(props: Props & InternalProps) {
    super(props);

    this.state = {
      amount: '',
      currency: 'ETH',
    };
  }

  render() {
    return (
      <AmountSelect
        amount={this.state.amount}
        currency={this.state.currency}
        onAmountSelected={(amount, currency, address, isValid) => {
          this.setState({ amount, currency });
          this.props.onAmountSelected(amount, currency, address, isValid);
        }}
        shouldCheckLess={this.props.shouldCheckLess || false}
        wallets={this.props.wallets}
      />
    );
  }
}
