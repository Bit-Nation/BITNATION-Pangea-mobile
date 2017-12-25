import Colors from './Colors';

export const tabsStyle = {
  tabBarButtonColor: '#FFFFFF',
  tabBarSelectedButtonColor: '#FFFFFF',
  tabBarBackgroundColor: 'rgba(17,39,110,0.9)',
};

export default {
  DASHBOARD_SCREEN: {
    screen: 'app.DashboardScreen',
    label: 'Dashboard',
    icon: require('../../resources/images/dashboard.png'),
  },
  CHAT_SCREEN: {
    screen: 'app.ChatScreen',
    label: 'Chat',
    icon: require('../../resources/images/chat.png'),
  },
  NATIONS_SCREEN: {
    screen: 'app.NationsScreen',
    label: 'Nations',
    icon: require('../../resources/images/nations.png'),
  },
  WALLET_SCREEN: {
    screen: 'app.WalletScreen',
    label: 'Wallet',
    icon: require('../../resources/images/wallet.png'),
  },
  PROFILE_SCREEN: {
    screen: 'app.ProfileScreen',
    label: 'Profile',
    icon: require('../../resources/images/profile.png'),
  },
};