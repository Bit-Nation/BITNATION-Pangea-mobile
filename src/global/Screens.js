import AssetsImages from './AssetsImages';
import Colors from './Colors';
import { Platform } from 'react-native';

export const tabsStyle = {
  tabBarButtonColor: Colors.white,
  tabBarLabelColor: Colors.BitNationLightBlue,
  tabBarSelectedLabelColor: Colors.white,
  tabBarSelectedButtonColor: Colors.white,
  tabBarBackgroundColor: 'rgba(17,39,110,0.9)',
};

export const appStyle = {
  ...tabsStyle
};

export const navigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? 'transparent' : 'black',
  navBarTransparent: true,
  navBarTranslucent: true,
  navBarNoBorder: true,
  drawUnderNavBar: true,
  drawUnderStatusBar: false,
  navBarTextColor: Colors.white,
};

export default {
  SPLASH_SCREEN: {
    screen: 'Pangea.SplashScreen',
    title: 'Splash',
  },
  DASHBOARD_SCREEN: {
    screen: 'Pangea.DashboardScreen',
    label: 'Dashboard',
    icon: AssetsImages.TabIcons.dashboard,
  },
  CHAT_SCREEN: {
    screen: 'Pangea.ChatScreen',
    label: 'Chat',
    icon: AssetsImages.TabIcons.chat,
  },
  NATIONS_SCREEN: {
    screen: 'Pangea.NationsScreen',
    label: 'Nations',
    icon: AssetsImages.TabIcons.nations,
  },
  WALLET_SCREEN: {
    screen: 'Pangea.WalletScreen',
    label: 'Wallet',
    icon: AssetsImages.TabIcons.wallet,
  },
  PROFILE_SCREEN: {
    screen: 'Pangea.ProfileScreen',
    label: 'Profile',
    icon: AssetsImages.TabIcons.profile,
    title: 'Profile',
    navigatorStyle
  },
};