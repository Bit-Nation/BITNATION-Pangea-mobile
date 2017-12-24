import { Navigation } from 'react-native-navigation';

import DashboardScreen from './dashboard/screen';
import ChatScreen from './chat/screen';
import NationsScreen from './nations/screen';
import WalletScreen from './wallet/screen';
import ProfileScreen from './profile/screen';
import Constants from '../global/Constants/index';

export function registerScreens() {
  Navigation.registerComponent(Constants.Screens.DASHBOARD_SCREEN.screen, () => DashboardScreen);
  Navigation.registerComponent(Constants.Screens.CHAT_SCREEN.screen, () => ChatScreen);
  Navigation.registerComponent(Constants.Screens.NATIONS_SCREEN.screen, () => NationsScreen);
  Navigation.registerComponent(Constants.Screens.WALLET_SCREEN.screen, () => WalletScreen);
  Navigation.registerComponent(Constants.Screens.PROFILE_SCREEN.screen, () => ProfileScreen);
}