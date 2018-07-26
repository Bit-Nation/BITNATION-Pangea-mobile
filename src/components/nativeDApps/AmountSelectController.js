/* eslint-disable no-use-before-define */
// @flow

import React, { Component } from 'react';
import type { InternalProps } from './AmountSelect';
import AmountSelect from './AmountSelect';
import type { CurrencyType } from '../../types/Wallet';

export type Props = {
  /**
   * @desc Style to apply to container view.
   */
  style?: Object,
  /**
   * @desc
   */
  onAmountSelected: (amount: string, currency: CurrencyType, walletAddress: string, isValid: boolean) => void,
  /**
   * @desc Flag whether amount is invalid if it greater than balance.
   */
  shouldCheckLess: boolean,
  /**
   * @desc Flag whether to allow user to change currency.
   */
  changeCurrencyEnabled?: boolean,
}

export default class AmountSelectController extends Component<Props & InternalProps, *> {
  static defaultProps: Object = {
    changeCurrencyEnabled: true,
  };

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
        changeCurrencyEnabled={this.props.changeCurrencyEnabled}
      />
    );
  }
}
