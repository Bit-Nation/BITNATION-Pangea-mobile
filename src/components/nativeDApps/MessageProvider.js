/* eslint-disable react/prop-types,no-empty */
// @flow

import * as React from 'react';

import type { Account } from '../../types/Account';
import type { DAppMessageType, ProfileType } from '../../types/Chat';
import type { Navigator } from '../../types/ReactNativeNavigation';


type ProviderProps = {
  /**
   * @desc Public key of DApp.
   */
  dAppPublicKey: string,
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
  },
};

/**
 * @desc HOC builder for providing helper functions and context into DApp messages.
 * @param {React.Component} Component Message component to wrap to.
 * @return {*} HOC
 */
export const MessageProvider = (Component: React.ComponentType<any>) => (props: ProviderProps) => {
  const providedProps: ProvidedProps = {
    context: {
      dAppMessage: props.dAppMessage,
      currentAccount: props.currentAccount,
      friend: props.friend,
    },
    services: {
    },
  };

  return <Component {...providedProps} />;
};
