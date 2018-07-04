// @flow

import { call, select } from 'redux-saga/effects';

import type { OpenDAppAction, SendDAppMessageAction } from '../../actions/nativeDApps';
import type { DAppType } from '../../dapps';
import { getDApp } from '../../reducers/nativeDApps';
import { sendMessage } from '../chat/sagas';
import { sendMessage as sendMessageAction } from '../../actions/chat';
import { launchDAppModal } from '../navigation/sagas';

/**
 * @desc Opens DApp.
 * @param {OpenDAppAction} action An action.
 * @return {void}
 */
export function* openDApp(action: OpenDAppAction): Generator<*, *, *> {
  const { dAppPublicKey, callback } = action;
  const { dApps } = yield select();
  const dApp: ?DAppType = yield call(getDApp, dApps, dAppPublicKey);
  if (dApp == null) {
    yield call(callback, false, new Error(`Unable to find DApp with public key ${dAppPublicKey}`));
    return;
  }
  const { contexts } = dApps;
  const context = contexts[dAppPublicKey] || {};

  try {
    yield call(launchDAppModal, dAppPublicKey, dApp.modal, context);
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
  const { message, session, callback } = action;

  try {
    yield call(sendMessage, sendMessageAction(JSON.stringify(message), session, callback));
  } catch (error) {
    console.log(`DApp send message failed: ${error}`);
  }
}
