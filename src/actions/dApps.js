// @flow

import { type DApp } from '../types/DApp';
import type { DAppMessageType, ChatSessionType } from '../types/Chat';

export type DAppsListUpdatedAction = { +type: 'DAPPS_LIST_UPDATED', availableDApps: Array<DApp> };
export type StartDAppAction = { +type: 'START_DAPP', dAppPublicKey: string };
export type DAppStartedAction = { +type: 'DAPP_STARTED', dAppPublicKey: string };
export type DAppStartFailedAction = { +type: 'DAPP_START_FAILED', dAppPublicKey: string };
export type OpenDAppAction = { +type: 'OPEN_DAPP', dAppPublicKey: string, context: Object, callback: (success: boolean, error: ?Error) => void };
export type PerformDAppCallbackAction = { +type: 'PERFORM_DAPP_CALLBACK', dAppPublicKey: string, callbackID: number, args: Object };
export type SendDAppMessageAction = { +type: 'SEND_DAPP_MESSAGE', message: DAppMessageType, session: ChatSessionType };

export type Action =
  | DAppsListUpdatedAction
  | StartDAppAction
  | DAppStartedAction
  | DAppStartFailedAction
  | OpenDAppAction
  | PerformDAppCallbackAction
  | SendDAppMessageAction;

export const DAPPS_LIST_UPDATED = 'DAPPS_LIST_UPDATED';
export const START_DAPP = 'START_DAPP';
export const DAPP_STARTED = 'DAPP_STARTED';
export const DAPP_START_FAILED = 'DAPP_START_FAILED';
export const OPEN_DAPP = 'OPEN_DAPP';
export const PERFORM_DAPP_CALLBACK = 'PERFORM_DAPP_CALLBACK';
export const SEND_DAPP_MESSAGE = 'SEND_DAPP_MESSAGE';

/**
 * @desc Action creator for an action that is called when DApps list updated.
 * @param {DApp[]} availableDApps Array of available DApps.
 * @returns {DAppsListUpdatedAction} An action.
 */
export function dAppsListUpdated(availableDApps: Array<DApp>): DAppsListUpdatedAction {
  return {
    type: DAPPS_LIST_UPDATED,
    availableDApps,
  };
}

/**
 * @desc Action creator for an action that is called when DApp started successfully.
 * @param {string} dAppPublicKey Public key of DApp that started.
 * @return {DAppStartedAction} An action.
 */
export function dAppStarted(dAppPublicKey: string): DAppStartedAction {
  return {
    type: DAPP_STARTED,
    dAppPublicKey,
  };
}

/**
 * @desc Action creator for an action that is called when DApp failed to start.
 * @param {string} dAppPublicKey Public key of DApp that failed to start.
 * @return {DAppStartFailedAction} An action.
 */
export function dAppStartFailed(dAppPublicKey: string): DAppStartFailedAction {
  return {
    type: DAPP_START_FAILED,
    dAppPublicKey,
  };
}

/**
 * @desc Action creator for an action to start DApp by its public key.
 * @param {string} dAppPublicKey Public key of DApp to open.
 * @return {StartDAppAction} An action.
 */
export function startDApp(dAppPublicKey: string): StartDAppAction {
  return {
    type: START_DAPP,
    dAppPublicKey,
  };
}


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
 * @desc Action creator for an action to perform DApp callback.
 * @param {string} dAppPublicKey Public key of DApp.
 * @param {number} callbackID Id of callback
 * @param {Object} args Arguments to be passed.
 * @return {PerformDAppCallbackAction} An action.
 */
export function performDAppCallback(dAppPublicKey: string, callbackID: number, args: Object): PerformDAppCallbackAction {
  return {
    type: PERFORM_DAPP_CALLBACK,
    dAppPublicKey,
    callbackID,
    args,
  };
}

/**
 * @desc Action creator for an action to send DApp message.
 * @param {DAppMessageType} message Message to send.
 * @param {ChatSessionType} session Session to send to.
 * @return {SendDAppMessageAction} An action.
 */
export function sendDAppMessage(message: DAppMessageType, session: ChatSessionType): SendDAppMessageAction {
  return {
    type: SEND_DAPP_MESSAGE,
    message,
    session,
  };
}
