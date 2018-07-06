/* eslint-disable react/prop-types,no-empty */
// @flow

import * as React from 'react';

import type { CurrencyType, WalletType } from '../../types/Wallet';
import type { Account } from '../../types/Account';
import AmountSelect, { type Props as AmountSelectProps } from './AmountSelect';
import type { ChatSessionType, DAppMessageType, GiftedChatMessageType, ProfileType } from '../../types/Chat';
import type { Navigator } from '../../types/ReactNativeNavigation';
import EthereumService from '../../services/ethereum';
import ServiceContainer from '../../services/container';
import type { DAppType } from '../../dapps';
import AmountSelectController from './AmountSelectController';

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
     * @param {AmountSelectProps} props Props to pass to AmountSelect component
     * @param {boolean} autoControlled Flag whether state of component should be handled automatically
     */
    renderAmountSelect: (props: AmountSelectProps, autoControlled?: boolean) => React.Node,
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
     * @return {Promise<Object>} Promise that resolves into transaction.
     */
    sendMoney: (currency: CurrencyType, toAddress: string, amount: string) => Promise<Object>,
    /**
     * @desc Deploy contract and return a deploy transaction.
     * @param {string} bytecode Byte code of contract
     * @param {string} abi ABI of contract
     * @param {string} txValue Value in ether to set to deploy transaction.
     * @param {any} params Additional params to pass.
     * @return {Promise<Object>} Promise that resolves into transaction
     */
    deployContract: (bytecode: string, abi: string, txValue?: string, ...params: any) => Promise<Object>,
    /**
     * @desc Function to get XPAT token contract address (based on current account network).
     */
    getXPATTokenAddress: () => string,
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
  const { identityPublicKey: dAppPublicKey, name } = props.dApp;
  if (ethereumService == null || dAppsWalletService == null) {
    return null;
  }

  const dAppName = `${name} DApp`;

  const providedProps: ProvidedProps = {
    context: {
      currentAccount: props.currentAccount,
      friend: props.friend,
    },
    components: {
      renderAmountSelect(customProps: AmountSelectProps, autoControlled: boolean = true) {
        return (autoControlled === true) ?
          <AmountSelectController {...customProps} wallets={props.wallets} />
          :
          <AmountSelect {...customProps} wallets={props.wallets} />;
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
      sendMoney: (currency, toAddress, amount) => dAppsWalletService.sendMoney(dAppName, currency, toAddress, amount),
      deployContract: (bytecode, abi, txValue, ...params) => dAppsWalletService.deployContract(dAppName, bytecode, abi, txValue, ...params),
      getXPATTokenAddress: dAppsWalletService.getXPATTokenAddress,
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
