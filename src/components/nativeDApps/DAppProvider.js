/* eslint-disable react/prop-types,no-empty */
// @flow

import * as React from 'react';
import { withProps } from 'recompose';

import type { WalletType } from '../../types/Wallet';
import type { Account } from '../../types/Account';
import AmountSelect from './AmountSelect';
import type { ChatSessionType, DAppMessageType, GiftedChatMessageType, GiftedChatUserType } from '../../types/Chat';
import type { Navigator } from '../../types/ReactNativeNavigation';


type ProviderProps = {
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
  dAppPublicKey: string,
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
  friend: GiftedChatUserType,
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
    friend: GiftedChatUserType,
  },
  components: {
    /**
     * @desc Renders AmountSelect component.
     */
    renderAmountSelect: (props: any) => React.Node,
  },
  services: {
    /**
     * @desc Function to send a message.
     */
    sendMessage: (type: string, groupId: string, params: Object, callback: (message: ?GiftedChatMessageType) => void) => void,
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
  const providedProps: ProvidedProps = {
    context: {
      currentAccount: props.currentAccount,
      friend: props.friend,
    },
    components: {
      renderAmountSelect(customProps) {
        return (
          <AmountSelect {...customProps} wallets={props.wallets} />
        );
      },
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
            dapp_id: props.dAppPublicKey,
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
    },
    navigation: {
      dismiss() {
        props.navigator.dismissModal();
      },
    },
  };

  return <Component {...providedProps} />;
};
