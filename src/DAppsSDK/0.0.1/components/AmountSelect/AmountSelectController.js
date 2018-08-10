/* eslint-disable no-use-before-define */
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { InternalProps } from './AmountSelect';
import AmountSelect from './AmountSelect';
import type { CurrencyType } from '../../../../types/Wallet';

export type Props = {
  /**
   * @desc Style to apply to container view.
   */
  style?: Object,
  /**
   * @desc
   */
  onAmountSelected: ({ amount: string, currency: CurrencyType, walletAddress: string, isValid: boolean }) => void,
  /**
   * @desc Flag whether amount is invalid if it greater than balance.
   */
  shouldCheckLess: boolean,
}

class AmountSelectController extends Component<Props & InternalProps, *> {
  static validNativeProps = [
    'shouldCheckLess',
    'style',
  ];

  static callbackProps = [
    'onAmountSelected',
  ];

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
        style={this.props.style}
        amount={this.state.amount}
        currency={this.state.currency}
        onAmountSelected={(amount, currency) => {
          this.setState({ amount, currency });
        }}
        onFinalChange={(amount, currency, address, isValid) => {
          this.props.onAmountSelected({
            amount,
            currency,
            walletAddress: address,
            isValid,
          });
        }}
        shouldCheckLess={this.props.shouldCheckLess || false}
        wallets={this.props.wallets}
      />
    );
  }
}

const mapStateToProps = state => ({
  wallets: state.wallet.wallets,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AmountSelectController);
