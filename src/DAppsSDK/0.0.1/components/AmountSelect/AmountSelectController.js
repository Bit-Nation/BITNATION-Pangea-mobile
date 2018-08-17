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
   * @desc Callback on selected amount change.
   */
  onAmountSelected: ({ amount: string, currency: CurrencyType, walletAddress: string, isValid: boolean, isLessThanBalance: boolean }) => void,
  /**
   * @desc Amount to be set at component constructing
   */
  initialAmount: string,
  /**
   * @desc Currency to be set at component constructing
   */
  initialCurrency: string,
  nativeProps: {
    /**
     * @desc Style object to pass to container.
     */
    style: Object,
  },
}

class AmountSelectController extends Component<Props & InternalProps, *> {
  static validNativeProps = [
    'style',
    'changeCurrencyEnabled',
  ];

  static callbackProps = [
    'onAmountSelected',
  ];

  static customProps = [
    'initialAmount',
    'initialCurrency',
  ];

  constructor(props: Props & InternalProps) {
    super(props);

    this.state = {
      amount: this.props.initialAmount || '',
      currency: this.props.initialCurrency || 'ETH',
    };
  }

  render() {
    return (
      <AmountSelect
        {...this.props.nativeProps}
        amount={this.state.amount}
        currency={this.state.currency}
        onAmountSelected={(amount, currency) => {
          this.setState({ amount, currency });
        }}
        onFinalChange={(amount, currency, address, isValid, isLessThanBalance) => {
          this.props.onAmountSelected({
            amount,
            currency,
            walletAddress: address,
            isValid,
            isLessThanBalance,
          });
        }}
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
