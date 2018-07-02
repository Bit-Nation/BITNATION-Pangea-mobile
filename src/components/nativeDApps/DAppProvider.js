/* eslint-disable react/prop-types,no-empty */
// @flow

import * as React from 'react';
import { withProps } from 'recompose';

import type { WalletType } from '../../types/Wallet';
import AmountSelect from './AmountSelect';
import type { ChatSessionType, DAppMessageType, GiftedChatMessageType } from '../../types/Chat';
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
};

export type ProvidedProps = {
  /**
   * @desc Wallets array
   */
  renderAmountSelect: (props: any) => React.Node,
  /**
   * @desc Function to send a message.
   */
  sendMessage: (type: string, groupId: string, params: Object, callback: (message: ?GiftedChatMessageType) => void) => void,
  /**
   * @desc Dismiss the modal.
   */
  dismiss: () => void
};

/**
 * @desc HOC builder for providing helper functions and context into DApp component.
 * @param {ProviderProps} props Props that are required for HOC.
 * @return {*} HOC
 */
export function dAppProvider(props: ProviderProps): * {
  const providedProps: ProvidedProps = {
    renderAmountSelect(customProps) {
      return (
        <AmountSelect {...customProps} wallets={props.wallets} />
      );
    },
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
    dismiss() {
      props.navigator.dismissModal();
    },
  };
  return withProps(providedProps);
}
