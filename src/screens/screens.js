// @flow

import { Navigation } from 'react-native-navigation';

import Accounts from './Accounts';
import DeveloperSettings from './Accounts/CreateAccount/DeveloperSettings';
import CreateIdentity from './Accounts/CreateAccount/CreateIdentity';
import CreateReady from './Accounts/CreateAccount/CreateReady';
import RestoreSource from './Accounts/RestoreAccount/RestoreSource';
import EmptyWallet from './Accounts/RestoreAccount/EmptyWallet';
import Dashboard from './Dashboard';
import WalletScreen from './WalletScreen';
import CreateKeyIntroductionScreen from './Key/Create/CreateKeyIntroductionScreen';
import CreateKeyInstructionScreen from './Key/Create/CreateKeyInstructionScreen';
import CreateKeyProcessScreen from './Key/Create/CreateKeyProcessScreen';
import LoadWalletScreeen from './Key/LoadWallet';
import VerifyKeyInstructionScreen from './Key/Verify/VerifyKeyInstructionScreen';
import VerifyKeyProcessScreen from './Key/Verify/VerifyKeyProcessScreen';
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
import SettingsScreen from './Settings/SettingsList';
import SecuritySettingsScreen from './Settings/Security';
import { screen } from '../global/Screens';
import EnterPasscodeScreen from './Passcode/EnterPasscodeContainer';
import CreatePasscodeScreen from './Passcode/CreatePasscodeContainer';

/**
 * @desc Registers screens for React Native Navigation.
 * @param {Object} store Store to pass to screens.
 * @param {Object} Provider Provider to pass to screens.
 * @return {void}
 */
export default function registerScreens(store: Object, Provider: Object) {
  Navigation.registerComponent(screen('ACCOUNTS_SCREEN').screen, () => Accounts, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_CREATE_DEVELOPER_SETTINGS').screen, () => DeveloperSettings, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_CREATE_IDENTITY').screen, () => CreateIdentity, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_CREATE_READY').screen, () => CreateReady, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_RESTORE_SOURCE').screen, () => RestoreSource, store, Provider);
  Navigation.registerComponent(screen('ACCOUNT_RESTORE_EMPTY_WALLET').screen, () => EmptyWallet, store, Provider);
  Navigation.registerComponent(screen('CREATE_KEY_INTRODUCTION_SCREEN').screen, () => CreateKeyIntroductionScreen, store, Provider);
  Navigation.registerComponent(screen('CREATE_KEY_INSTRUCTION_SCREEN').screen, () => CreateKeyInstructionScreen, store, Provider);
  Navigation.registerComponent(screen('CREATE_KEY_PROCESS_SCREEN').screen, () => CreateKeyProcessScreen, store, Provider);
  Navigation.registerComponent(screen('LOAD_WALLET_SCREEN').screen, () => LoadWalletScreeen, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_INSTRUCTION_SCREEN').screen, () => VerifyKeyInstructionScreen, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_PROCESS_SCREEN').screen, () => VerifyKeyProcessScreen, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_SUCCESS_SCREEN').screen, () => VerifyKeySuccess, store, Provider);
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
  Navigation.registerComponent(screen('SETTINGS_SCREEN').screen, () => SettingsScreen, store, Provider);
  Navigation.registerComponent(screen('SECURITY_SETTINGS_SCREEN').screen, () => SecuritySettingsScreen, store, Provider);
  Navigation.registerComponent(screen('ENTER_PASSCODE_SCREEN').screen, () => EnterPasscodeScreen, store, Provider);
  Navigation.registerComponent(screen('CREATE_PASSCODE_SCREEN').screen, () => CreatePasscodeScreen, store, Provider);
}
