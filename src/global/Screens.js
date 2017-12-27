import AssetsImages from './AssetsImages';

export const tabsStyle = {
  tabBarButtonColor: '#FFFFFF',
  tabBarSelectedButtonColor: '#FFFFFF',
  tabBarBackgroundColor: 'rgba(17,39,110,0.9)',
};

export const navigatorStyle = {
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navigationBarColor: 'black',
  navBarBackgroundColor: '#0a0a0a',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  tabBarButtonColor: 'red',
  tabBarSelectedButtonColor: 'red',
  tabBarBackgroundColor: 'white',
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
  },
};