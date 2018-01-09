import { Navigation } from 'react-native-navigation';

import SplashScreen from './SplashScreen';
import Dashboard from './Dashboard';
import WalletScreen from './WalletScreen';
import CreateKeyStep1 from './Key/Create/CreateKeyStep1';
import CreateKeyStep2 from './Key/Create/CreateKeyStep2';
import CreateKeyStep3 from './Key/Create/CreateKeyStep3';
import CreateKeySuccessScreen from './Key/Create/CreateKeySuccessScreen';
import VerifyKeyStep1 from './Key/Verify/VerifyKeyStep1';
import VerifyKeyStep2 from './Key/Verify/VerifyKeyStep2';
import VerifyKeySuccess from './Key/Verify/VerifyKeySuccess';
import Intro from './Intro/RNSwiper';
import SendMoney from './WalletScreen/SendMoney';
import ReceiveMoneyScreen from './WalletScreen/ReceiveMoney';
import ChatScreen from './ChatScreen';
import NationsScreen from './NationsScreen';
import ProfileScreen from './ProfileScreen';
import NationDetailsScreen from './NationDetailsContainer';
import { screen } from '../global/Screens';

export function registerScreens(store, Provider) {

  Navigation.registerComponent(screen('CREATE_KEY_SCREEN_STEP_1').screen, () => CreateKeyStep1, store, Provider);
  Navigation.registerComponent(screen('CREATE_KEY_SCREEN_STEP_2').screen, () => CreateKeyStep2, store, Provider);
  Navigation.registerComponent(screen('CREATE_KEY_SCREEN_STEP_3').screen, () => CreateKeyStep3, store, Provider);
  Navigation.registerComponent(screen('CREATE_KEY_SUCCESS_SCREEN').screen, () => CreateKeySuccessScreen, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_SCREEN_STEP_1').screen, () => VerifyKeyStep1, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_SCREEN_STEP_2').screen, () => VerifyKeyStep2, store, Provider);
  Navigation.registerComponent(screen('VERIFY_KEY_SUCCESS_SCREEN').screen, () => VerifyKeySuccess, store, Provider);
  Navigation.registerComponent(screen('INTRO_SCREEN').screen, () => Intro, store, Provider);
  Navigation.registerComponent(screen('DASHBOARD_SCREEN').screen, () => Dashboard, store, Provider);
  Navigation.registerComponent(screen('SPLASH_SCREEN').screen, () => SplashScreen, store, Provider);
  Navigation.registerComponent(screen('CHAT_SCREEN').screen, () => ChatScreen, store, Provider);
  Navigation.registerComponent(screen('NATIONS_SCREEN').screen, () => NationsScreen, store, Provider);
  Navigation.registerComponent(screen('NATION_DETAILS_SCREEN').screen, () => NationDetailsScreen, store, Provider);
  Navigation.registerComponent(screen('WALLET_SCREEN').screen, () => WalletScreen, store, Provider);
  Navigation.registerComponent(screen('PROFILE_SCREEN').screen, () => ProfileScreen, store, Provider);
  Navigation.registerComponent(screen('RECEIVE_MONEY_SCREEN').screen, () => ReceiveMoneyScreen, store, Provider);
  Navigation.registerComponent(screen('SEND_MONEY_SCREEN').screen, () => SendMoney, store, Provider);


}