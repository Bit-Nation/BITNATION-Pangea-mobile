// @flow

import { combineReducers } from 'redux';
import accounts, { type State as AccountsState } from './accounts';
import nations, { type State as NationsState } from './nations';
import modifyNation, { type State as ModifyNationState } from './modifyNation';
import wallet, { type State as WalletState } from './wallet';
import key, { type State as KeyState } from './key';
import activity, { type State as ActivityState } from './activity';
import testingMode, { type State as TestingModeState } from './testingMode';
import chat, { type State as ChatState } from './chat';
import confirmation, { type State as ConfirmationState } from './confirmation';

export type State = {
  accounts: AccountsState,
  nations: NationsState,
  modifyNation: ModifyNationState,
  wallet: WalletState,
  key: KeyState,
  activity: ActivityState,
  testingMode: TestingModeState,
  chat: ChatState,
  confirmation: ConfirmationState,
}

export const subReducers = {
  accounts,
  nations,
  modifyNation,
  wallet,
  key,
  activity,
  testingMode,
  chat,
  confirmation,
};

export default combineReducers(subReducers);
