// @flow

import { combineReducers } from 'redux';
import accounts, { type State as AccountsState } from '@pangea/accounts/accounts-reducers';
import nations, { type State as NationsState } from '@pangea/nations/nations-reducers';
import modifyNation, { type State as ModifyNationState } from '@pangea/nations/modifyNation-reducers';
import wallet, { type State as WalletState } from '@pangea/wallet/wallet-reducers';
import key, { type State as KeyState } from '@pangea/key/key-reducers';
import activity, { type State as ActivityState } from '@pangea/activity/activity-reducers';
import testingMode, { type State as TestingModeState } from '@pangea/accounts/testingMode-reducers';
import chat, { type State as ChatState } from '@pangea/chat/chat-reducers';
import settings, { type State as SettingsState } from '@pangea/settings/settings-reducers';
import dApps, { type State as DAppsState } from '@pangea/dApps/dApps-reducers';
import documents, { type State as DocumentsState } from '@pangea/documents/documents-reducers';
import contacts, { type State as ContactsState } from '@pangea/contacts/contacts-reducers';

export type State = {
  accounts: AccountsState,
  nations: NationsState,
  modifyNation: ModifyNationState,
  wallet: WalletState,
  key: KeyState,
  activity: ActivityState,
  testingMode: TestingModeState,
  chat: ChatState,
  settings: SettingsState,
  dApps: DAppsState,
  documents: DocumentsState,
  contacts: ContactsState,
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
  settings,
  dApps,
  documents,
  contacts,
};

export default combineReducers(subReducers);
