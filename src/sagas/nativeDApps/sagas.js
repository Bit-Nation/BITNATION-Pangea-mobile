// @flow

import { call, select } from 'redux-saga/effects';

import type { OpenDAppAction, SendDAppMessageAction } from '../../actions/dApps';
import type { DAppType } from '../../services/database/schemata';
import { getDApp } from '../dApps/sagas';
import { sendMessage } from '../chat/sagas';
import { sendMessage as sendMessageAction } from '../../actions/chat';

/**
 * @desc Opens DApp.
 * @param {OpenDAppAction} action An action.
 * @return {void}
 */
export function* openDApp(action: OpenDAppAction): Generator<*, *, *> {
  const { dAppPublicKey, callback } = action;
  const dApp: ?DAppType = yield call(getDApp, dAppPublicKey);
  if (dApp == null) {
    yield call(callback, false, new Error(`Unable to find DApp with public key ${dAppPublicKey}`));
    return;
  }
  const { dApps: { contexts } } = yield select();
  const context = contexts[dAppPublicKey] || {};

  try {
    // @todo Call DApp open handler.
    // yield call(DAppsService.openDApp, dAppPublicKey, context);
    yield call(callback, true);
  } catch (error) {
    console.log(`DApp open failed: ${error}`);
    yield call(callback, false, error);
  }
}

/**
 * @desc Sends messages from DApp.
 * @param {SendDAppMessageAction} action An action.
 * @return {void}
 */
export function* sendDAppMessage(action: SendDAppMessageAction): Generator<*, *, *> {
  const { message, session } = action;

  try {
    yield call(sendMessage, sendMessageAction(JSON.stringify(message), session));
  } catch (error) {
    console.log(`DApp send message failed: ${error}`);
  }
}
