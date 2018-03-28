// @flow

import { combineReducers } from 'redux';
import profile, { type State as ProfileState } from './profile';
import nations, { type State as NationsState } from './nations';
import modifyNation, { type State as ModifyNationState } from './modifyNation';
import wallet, { type State as WalletState } from './wallet';
import key, { type State as KeyState } from './key';
import activity, { type State as ActivityState } from './activity';
import testingMode, { type State as TestingModeState } from './testingMode';
import chat, { type State as ChatState } from './chat';

export type State = {
  profile: ProfileState,
  nations: NationsState,
  modifyNation: ModifyNationState,
  wallet: WalletState,
  key: KeyState,
  activity: ActivityState,
  testingMode: TestingModeState,
  chat: ChatState,
}

export const subReducers = {
  profile,
  nations,
  modifyNation,
  wallet,
  key,
  activity,
  testingMode,
  chat,
};

export default combineReducers(subReducers);
