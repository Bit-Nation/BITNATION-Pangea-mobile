import { Navigation } from 'react-native-navigation';

//import Drawer from './modules/_global/Drawer';
import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';
import DashboardScreen from './DashboardScreen';
import ChatScreen from './ChatScreen';
import NationsScreen from './NationsScreen';
import WalletScreen from './WalletScreen';
import ProfileScreen from './ProfileScreen';
import Screens from '../global/Screens';


export function registerScreens(store, Provider) {
  Navigation.registerComponent(Screens.SPLASH_SCREEN.screen, () => SplashScreen, store, Provider);
  Navigation.registerComponent(Screens.MAIN_SCREEN.screen, () => MainScreen, store, Provider);
  Navigation.registerComponent(Screens.DASHBOARD_SCREEN.screen, () => DashboardScreen, store, Provider);
  Navigation.registerComponent(Screens.CHAT_SCREEN.screen, () => ChatScreen, store, Provider);
  Navigation.registerComponent(Screens.NATIONS_SCREEN.screen, () => NationsScreen, store, Provider);
  Navigation.registerComponent(Screens.WALLET_SCREEN.screen, () => WalletScreen, store, Provider);
  Navigation.registerComponent(Screens.PROFILE_SCREEN.screen, () => ProfileScreen, store, Provider);
}


//    Navigation.registerComponent('Pangea.SplashScreen', () => SplashScreen, store, Provider);
//    Navigation.registerComponent('Pangea.MainScreen', () => MainScreen, store, Provider);
