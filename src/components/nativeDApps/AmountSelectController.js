/* eslint-disable no-use-before-define */
// @flow

import React, { Component } from 'react';
import type { InternalProps, Props } from './AmountSelect';
import AmountSelect from './AmountSelect';
import type { CurrencyType } from '../../types/Wallet';

type State = {
  amount: string,
  address: string,
  currency: CurrencyType,
};

export default class AmountSelectController extends Component<Props & InternalProps, State> {
  constructor(props: Props & InternalProps) {
    super(props);

    this.state = {
      amount: '',
      currency: props.wallets[0].currency,
      address: props.wallets[0].ethAddress,
    };
  }

  render() {
    return (
      <AmountSelect
        amount={this.state.amount}
        currency={this.state.currency}
        walletAddress={this.state.address}
        onAmountSelected={(amount, currency, address, isValid) => {
          this.setState({ amount, currency, address });
          this.props.onAmountSelected(amount, currency, address, isValid);
        }}
        shouldCheckLess={this.props.shouldCheckLess || false}
        wallets={this.props.wallets}
      />
    );
  }
}
