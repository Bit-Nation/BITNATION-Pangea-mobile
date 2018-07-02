// @flow

import * as React from 'react';
import { withProps } from 'recompose';

import type { WalletType } from '../../types/Wallet';
import AmountSelect from './AmountSelect';

type ProviderProps = {
  /**
   * @desc Wallets array
   */
  wallets: Array<WalletType>
};

export type ProvidedProps = {
  /**
   * @desc Wallets array
   */
  renderAmountSelect: () => AmountSelect
};

/**
 * @desc HOC builder for providing helper functions and context into DApp component.
 * @param {ProviderProps} props Props that are required for HOC.
 * @return {*} HOC
 */
export function dAppProvider<P>(props: ProviderProps): ((Component: React.ComponentType<P>) => React.ComponentType<P>) {
  return withProps({
    renderAmountSelect(customProps) {
      return (
        <AmountSelect {...customProps} wallets={props.wallets} />
      );
    },
  });
}
