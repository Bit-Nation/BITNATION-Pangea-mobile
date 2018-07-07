// @flow

import type { DAppMessageType, ChatSessionType, GiftedChatMessageType } from '../types/Chat';

export type OpenDAppAction = { +type: 'OPEN_DAPP', dAppPublicKey: string, context: Object, callback: (success: boolean, error: ?Error) => void };
export type SendDAppMessageAction = { +type: 'SEND_DAPP_MESSAGE', message: DAppMessageType, session: ChatSessionType, callback: (message: ?GiftedChatMessageType) => void };

export type Action =
  | OpenDAppAction
  | SendDAppMessageAction;

export const OPEN_DAPP = 'OPEN_DAPP';
export const SEND_DAPP_MESSAGE = 'SEND_DAPP_MESSAGE';

/**
 * @desc Action creator for an action to open DApp by its public key.
 * @param {string} dAppPublicKey Public key of DApp to open.
 * @param {Object} context Context that will be passed to DApp,
 * e.g. object containing ethereum address of recipient.
 * @param {function} callback Callback to be called on finish.
 * @return {OpenDAppAction} An action.
 */
export function openDApp(dAppPublicKey: string, context: Object = {}, callback: () => void = () => undefined): OpenDAppAction {
  return {
    type: OPEN_DAPP,
    dAppPublicKey,
    context,
    callback,
  };
}

/**
 * @desc Action creator for an action to send DApp message.
 * @param {DAppMessageType} message Message to send.
 * @param {ChatSessionType} session Session to send to.
 * @param {function} callback Callback to call on finish or error.
 * @return {SendDAppMessageAction} An action.
 */
export function sendDAppMessage(message: DAppMessageType, session: ChatSessionType, callback: (message: ?GiftedChatMessageType) => void): SendDAppMessageAction {
  return {
    type: SEND_DAPP_MESSAGE,
    message,
    session,
    callback,
  };
}
