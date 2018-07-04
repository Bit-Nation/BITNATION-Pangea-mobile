/* eslint-disable react/prop-types,no-empty */
// @flow

import * as React from 'react';

import type { CurrencyType, WalletType } from '../../types/Wallet';
import type { Account } from '../../types/Account';
import AmountSelect, { type Props as AmountSelectProps } from './AmountSelect';
import type { ChatSessionType, DAppMessageType, GiftedChatMessageType, ProfileType } from '../../types/Chat';
import type { Navigator } from '../../types/ReactNativeNavigation';
import EthereumService from '../../services/ethereum';
import DAppWalletService from '../../services/dAppsWalletService';
import ServiceContainer from '../../services/container';
import type { DAppType } from '../../dapps';

export type ProviderProps = {
  /**
   * @desc Wallets array
   */
  wallets: Array<WalletType>,
  /**
   * @desc Chat session.
   */
  session: ChatSessionType,
  /**
   * @desc Public key of DApp.
   */
  dApp: DAppType,
  /**
   * @desc Function to send a DApp message.
   */
  sendMessage: (message: DAppMessageType, session: ChatSessionType, callback: (message: ?GiftedChatMessageType) => void) => void,
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
   * @desc Function to show or hide loading.
   */
  setLoadingVisible: (visible: boolean) => void,
};

export type ProvidedProps = {
  context: {
    /**
     * @desc Account of current user.
     */
    currentAccount: Account,
    /**
     * @desc Profile of current chat friend.
     */
    friend: ProfileType,
  },
  components: {
    /**
     * @desc Renders AmountSelect component.
     */
    renderAmountSelect: (props: AmountSelectProps) => React.Node,
    /**
     * @desc Function to show or hide loading.
     */
    setLoadingVisible: (visible: boolean) => void,
  },
  services: {
    /**
     * @desc Function to send a message.
     */
    sendMessage: (type: string, groupId: string, params: Object, callback: (message: ?GiftedChatMessageType) => void) => void,
    /**
     * @desc Service to deal with ethereum.
     */
    ethereumService: EthereumService,
    /**
     * @desc Function to send money
     * @param {CurrencyType} currency String with currency symbol (ETH, XPAT)
     * @param {string} toAddress Address to send ether to.
     * @param {string} amount Amount in base currency unit (ether, XPAT)
     * @return {Promise<void>} Promise
     */
    sendMoney: (currency: CurrencyType, toAddress: string, amount: string) => Promise<void>,
  },
  navigation: {
    /**
     * @desc Dismiss the modal.
     */
    dismiss: () => void
  }
};

/**
 * @desc HOC builder for providing helper functions and context into DApp component.
 * @param {React.Component} Component Component to wrap to.
 * @return {*} HOC
 */
export const DAppProvider = (Component: React.ComponentType<any>) => (props: ProviderProps) => {
  const { ethereumService, dAppsWalletService } = ServiceContainer.instance;
  const { identityPublicKey: dAppPublicKey, name: dAppName } = props.dApp;
  if (ethereumService == null || dAppsWalletService == null) {
    return null;
  }

  const providedProps: ProvidedProps = {
    context: {
      currentAccount: props.currentAccount,
      friend: props.friend,
    },
    components: {
      renderAmountSelect(customProps: AmountSelectProps) {
        return (
          <AmountSelect {...customProps} wallets={props.wallets} />
        );
      },
      setLoadingVisible: props.setLoadingVisible,
    },
    services: {
      sendMessage(type: string, groupId: string, params: Object, callback: (message: ?GiftedChatMessageType) => void) {
        // @todo Add error providing.
        if (type.length > 100) {
          callback(null);
          return;
        }
        if (groupId.length > 100) {
          callback(null);
          return;
        }
        try {
          const stringified = JSON.stringify(params);
          if (stringified.length > 5000000) return;
          props.sendMessage({
            dapp_id: dAppPublicKey,
            type,
            group_id: groupId,
            params: stringified,
            should_send: true,
            should_render: true,
          }, props.session, callback);
        } catch (e) {
          callback(null);
        }
      },
      ethereumService,
      sendMoney: (currency, toAddress, amount) => dAppsWalletService.sendMoney(`${dAppName} DApp`, currency, toAddress, amount),
    },
    navigation: {
      dismiss() {
        props.navigator.dismissModal();
      },
    },
  };

  return (
    <Component {...providedProps} />
  );
};
