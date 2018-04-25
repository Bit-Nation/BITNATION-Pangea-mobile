// @flow

import { Navigation } from 'react-native-navigation';

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
import ProfileScreen from './ProfileScreen';
import NationDetailsScreen from './NationDetailsContainer';
import NationCreateScreen from './NationCreateContainer';
import ChatNationsScreen from './ChatNationsScreen';
import { screen } from '../global/Screens';
import PinCodeScreen from './Passcode/PinCode';

/**
 * @desc Registers screens for React Native Navigation.
 * @param {Object} store Store to pass to screens.
 * @param {Object} Provider Provider to pass to screens.
 * @return {void}
 */
export default function registerScreens(store: Object, Provider: Object) {
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
  Navigation.registerComponent(screen('PIN_CODE_SCREEN').screen, () => PinCodeScreen, store, Provider);
}
