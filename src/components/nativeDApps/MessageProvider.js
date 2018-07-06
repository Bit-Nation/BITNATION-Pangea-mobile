/* eslint-disable react/prop-types,no-empty */
// @flow

import * as React from 'react';

import type { Account } from '../../types/Account';
import type { DAppMessageType, ProfileType } from '../../types/Chat';
import type { Navigator } from '../../types/ReactNativeNavigation';
import EthereumService from '../../services/ethereum';
import ServiceContainer from '../../services/container';
import DAppWalletService from '../../services/dAppsWalletService';
import type { CurrencyType } from '../../types/Wallet';
import type { DAppType } from '../../dapps';


type ProviderProps = {
  /**
   * @desc Public key of DApp.
   */
  dApp: DAppType,
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Account of current user
   */
  currentAccount: Account,
  /**
   * @desc Profile of current chat friend.
   */
  friend: ProfileType,
  /**
   * @desc Message to render.
   */
  dAppMessage: DAppMessageType,
};

export type ProvidedProps = {
  context: {
    /**
     * @desc Message to render.
     */
    dAppMessage: DAppMessageType,
    /**
     * @desc Account of current user.
     */
    currentAccount: Account,
    /**
     * @desc Profile of current chat friend.
     */
    friend: ProfileType,
  },
  services: {
    /**
     * @desc Service to deal with ethereum.
     */
    ethereumService: EthereumService,
    /**
     * @desc Function to send money
     * @param {CurrencyType} currency String with currency symbol (ETH, XPAT)
     * @param {string} toAddress Address to send ether to.
     * @param {string} amount Amount in base currency unit (ether, XPAT)
     * @return {Promise<Object>} Promise that resolves into transaction.
     */
    sendMoney: (currency: CurrencyType, toAddress: string, amount: string) => Promise<Object>,
  },
};

/**
 * @desc HOC builder for providing helper functions and context into DApp messages.
 * @param {React.Component} Component Message component to wrap to.
 * @return {*} HOC
 */
export const MessageProvider = (Component: React.ComponentType<any>) => (props: ProviderProps) => {
  const { ethereumService, dAppsWalletService } = ServiceContainer.instance;
  if (ethereumService == null || dAppsWalletService == null) {
    return null;
  }

  const providedProps: ProvidedProps = {
    context: {
      dAppMessage: props.dAppMessage,
      currentAccount: props.currentAccount,
      friend: props.friend,
    },
    services: {
      ethereumService,
      sendMoney: (currency, toAddress, amount) => dAppsWalletService.sendMoney(props.dApp.name, currency, toAddress, amount),
    },
  };

  return <Component {...providedProps} />;
};
