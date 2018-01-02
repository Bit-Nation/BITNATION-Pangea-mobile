import AssetsImages from './AssetsImages';
import Colors from './Colors';

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
  RECEIVE_MONEY_SCREEN: {
    screen: 'Pangea.ReceiveMoneyScreen',
    label: 'Recieve Money',
  },
  WALLET_LIST_SCREEN: {
    screen: 'Pangea.WalletListScreen',
    label: 'List',
  },

  VarifyKeyStep3: {
    screen: 'Pangea.VarifyKeyStep3',
    label: 'Recieve Money',
  },
};
