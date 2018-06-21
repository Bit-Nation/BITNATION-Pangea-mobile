// @flow

import { Navigation } from 'react-native-navigation';

import Accounts from './Accounts';
import DeveloperSettings from './Accounts/CreateAccount/DeveloperSettings';
import CreateReady from './Accounts/CreateAccount/CreateReady';
import RestoreSource from './Accounts/RestoreAccount/RestoreSource';
import EmptyWallet from './Accounts/RestoreAccount/EmptyWallet';
import Dashboard from './Dashboard';
import WalletScreen from './WalletScreen';
import ConfirmKeyInstructionScreen from './Key/Confirm/ConfirmKeyInstructionScreen';
import ConfirmKeyProcessScreen from './Key/Confirm/ConfirmKeyProcessScreen';
import VerifyKeyInstructionScreen from './Key/Verify/VerifyKeyInstructionScreen';
import EnterKeyScreen from './Key/Enter';
import ViewPrivateKeyScreen from './Key/View';
import VerifyKeySuccess from './Key/Verify/VerifyKeySuccess';
import Intro from './Intro/RNSwiper';
import SendMoney from './WalletScreen/SendMoney';
import ReceiveMoneyScreen from './WalletScreen/ReceiveMoney';
// eslint-disable-next-line import/no-unresolved,import/extensions
import QRCodeScannerScreen from './WalletScreen/QRCodeScanner';
import ChatScreen from './ChatScreen';
import NationsScreen from './NationsScreen';
import ProfileScreen from './Settings/ProfileScreen';
import NationDetailsScreen from './NationDetailsContainer';
import NationCreateScreen from './NationCreateContainer';
import ChatNationsScreen from './ChatNationsScreen';
import NewChatScreen from './NewChatScreen';
import SettingsScreen from './Settings/SettingsList';
import SecuritySettingsScreen from './Settings/Security';
import AccountsAccess from './Accounts/AccountAccessContainer';
import ConfirmationContainer from './ConfirmationContainer';
import { screen } from '../global/Screens';
import EnterPasscodeScreen from './Passcode/EnterPasscodeContainer';
import CreatePasscodeScreen from './Passcode/CreatePasscodeContainer';
import ChatListScreen from './PrivateChat/ChatList';

/**
 * @desc Registers screens for React Native Navigation.
 * @param {Object} store Store to pass to screens.
 * @param {Object} Provider Provider to pass to screens.
 * @return {void}
 */
export default function registerScreens(store: Object, Provider: Object) {
  Navigation.registerComponent(screen('ACCOUNTS_SCREEN').screen, () => Accounts, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_CREATE_DEVELOPER_SETTINGS').screen, () => DeveloperSettings, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_CREATE_READY').screen, () => CreateReady, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_RESTORE_SOURCE').screen, () => RestoreSource, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_RESTORE_EMPTY_WALLET').screen, () => EmptyWallet, store, Provider);
  Navigation.registerComponent(screen('CONFIRM_KEY_INSTRUCTION_SCREEN').screen, () => ConfirmKeyInstructionScreen, store, Provider);
  Navigation.registerComponent(screen('CONFIRM_KEY_PROCESS_SCREEN').screen, () => ConfirmKeyProcessScreen, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_INSTRUCTION_SCREEN').screen, () => VerifyKeyInstructionScreen, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_PROCESS_SCREEN').screen, () => EnterKeyScreen, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_SUCCESS_SCREEN').screen, () => VerifyKeySuccess, store, Provider);
  Navigation.registerComponent(screen('RESTORE_KEY_SCREEN').screen, () => EnterKeyScreen, store, Provider);
  Navigation.registerComponent(screen('VIEW_PRIVATE_KEY_SCREEN').screen, () => ViewPrivateKeyScreen, store, Provider);
  Navigation.registerComponent(screen('INTRO_SCREEN').screen, () => Intro, store, Provider);
  Navigation.registerComponent(screen('DASHBOARD_SCREEN').screen, () => Dashboard, store, Provider);
  Navigation.registerComponent(screen('CHAT_SCREEN').screen, () => ChatScreen, store, Provider);
  Navigation.registerComponent(screen('NATIONS_SCREEN').screen, () => NationsScreen, store, Provider);
  Navigation.registerComponent(screen('NATION_DETAILS_SCREEN').screen, () => NationDetailsScreen, store, Provider);
  Navigation.registerComponent(screen('WALLET_SCREEN').screen, () => WalletScreen, store, Provider);
  Navigation.registerComponent(screen('PROFILE_SCREEN').screen, () => ProfileScreen, store, Provider);
  Navigation.registerComponent(screen('RECEIVE_MONEY_SCREEN').screen, () => ReceiveMoneyScreen, store, Provider);
  Navigation.registerComponent(screen('SEND_MONEY_SCREEN').screen, () => SendMoney, store, Provider);
  Navigation.registerComponent(screen('QR_CODE_SCANNER_SCREEN').screen, () => QRCodeScannerScreen, store, Provider);
  Navigation.registerComponent(screen('NATION_CREATE_SCREEN').screen, () => NationCreateScreen, store, Provider);
  Navigation.registerComponent(screen('CHAT_NATIONS_SCREEN').screen, () => ChatNationsScreen, store, Provider);
  Navigation.registerComponent(screen('NEW_CHAT_SCREEN').screen, () => NewChatScreen, store, Provider);
  Navigation.registerComponent(screen('SETTINGS_SCREEN').screen, () => SettingsScreen, store, Provider);
  Navigation.registerComponent(screen('SECURITY_SETTINGS_SCREEN').screen, () => SecuritySettingsScreen, store, Provider);
  Navigation.registerComponent(screen('ACCOUNTS_ACCESS_SCREEN').screen, () => AccountsAccess, store, Provider);
  Navigation.registerComponent(screen('ENTER_PASSCODE_SCREEN').screen, () => EnterPasscodeScreen, store, Provider);
  Navigation.registerComponent(screen('CREATE_PASSCODE_SCREEN').screen, () => CreatePasscodeScreen, store, Provider);
  Navigation.registerComponent(screen('CONFIRMATION_SCREEN').screen, () => ConfirmationContainer, store, Provider);
  Navigation.registerComponent(screen('CHAT_LIST_SCREEN').screen, () => ChatListScreen, store, Provider);
}
