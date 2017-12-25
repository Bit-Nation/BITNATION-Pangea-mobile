import { Navigation } from 'react-native-navigation';

import { registerScreens } from './flow/screens';
import Constants from './global/Constants';
import { tabsStyle } from './global/Constants/Screens';

registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    Constants.Screens.DASHBOARD_SCREEN,
    Constants.Screens.CHAT_SCREEN,
    Constants.Screens.NATIONS_SCREEN,
    Constants.Screens.WALLET_SCREEN,
    Constants.Screens.PROFILE_SCREEN,
  ],
  tabsStyle,
});