import AssetsImages from './AssetsImages';
import Colors from './Colors';
import Strings from './Strings';
import { Platform } from 'react-native';

// Styles for Navigation Bar
export const tabsStyle = {
  tabBarButtonColor: Colors.tabBarButtonColor,
  tabBarLabelColor: Colors.tabBarLabelColor,
  tabBarSelectedLabelColor: Colors.tabBarSelectedLabelColor,
  tabBarSelectedButtonColor: Colors.tabBarSelectedButtonColor,
  tabBarBackgroundColor: Colors.tabBarBackgroundColor,
};

export const appStyle = {
  ...tabsStyle
};

export const androidNavigationButtons = Platform.OS === 'android' ? {
  leftButtons: [{
    id: 'back',
    buttonColor: Colors.white,
  }],
} : {};

// Navigation Bar Style
export const navigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? 'transparent' : 'black',
  navBarTransparent: true,
  navBarTranslucent: true,
  navBarNoBorder: true,
  drawUnderNavBar: true,
  drawUnderStatusBar: false,
  navBarTextColor: Colors.white,
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background',
};

export const hiddenNavigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? 'transparent' : 'black',
  navBarHidden: true,
  drawUnderStatusBar: false,
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background',
};

const baseKeyScreen = {
  navigatorStyle: {
    ...navigatorStyle,
    disabledBackGesture: true,
  },
  overrideBackPress: true,
};

/*
  label : this text string appears in the navigation bar at the bottom of the screen
  icon  : icon for navigation bar
  title : ???
 */

const Screens = {
  SPLASH_SCREEN: {
    screen: 'Pangea.SplashScreen',
    title: 'Splash',
  },
  DASHBOARD_SCREEN: {
    screen: 'Pangea.DashboardScreen',
    label: Strings.navbar.dashboard,
    icon: AssetsImages.TabIcons.dashboard,
    navigatorStyle: hiddenNavigatorStyle,
  },
  CHAT_SCREEN: {
    screen: 'Pangea.ChatScreen',
    label: Strings.navbar.chat,
    icon: AssetsImages.TabIcons.chat,
    title: 'Chat',
    navigatorStyle: hiddenNavigatorStyle,
  },
  NATIONS_SCREEN: {
    screen: 'Pangea.NationsScreen',
    label: Strings.navbar.nations,
    icon: AssetsImages.TabIcons.nations,
    title: '  Nations  ', // Spaces here are to fix title truncating
    navigatorStyle,
  },
  NATION_DETAILS_SCREEN: {
    screen: 'Pangea.NationDetailsScreen',
    title: 'Nation',
    navigatorStyle,
  },
  NATION_CREATE_SCREEN: {
    screen: 'Pangea.NationCreateScreen',
    title: '',
    navigatorStyle,
  },
  WALLET_SCREEN: {
    screen: 'Pangea.WalletScreen',
    label: Strings.navbar.wallet,
    icon: AssetsImages.TabIcons.wallet,
    title: 'Wallet',
    navigatorStyle,
  },
  PROFILE_SCREEN: {
    screen: 'Pangea.ProfileScreen',
    label: Strings.navbar.profile,
    icon: AssetsImages.TabIcons.profile,
    title: 'Profile & Settings',
    navigatorStyle,
  },
  CREATE_KEY_INTRODUCTION_SCREEN: {
    screen: 'Pangea.CreateKeyIntroductionScreen',
    title: ' Create Private Key ',
    ...baseKeyScreen,
  },
  CREATE_KEY_INSTRUCTION_SCREEN: {
    screen: 'Pangea.CreateKeyInstructionScreen',
    title: 'Create Private Key',
    ...baseKeyScreen,
  },
  CREATE_KEY_PROCESS_SCREEN: {
    screen: 'Pangea.CreateKeyProcessScreen',
    title: 'Create Private Key',
    ...baseKeyScreen,
  },
  VERIFY_KEY_INSTRUCTION_SCREEN: {
    screen: 'Pangea.VerifyKeyInstructionScreen',
    title: 'Verify Private Key',
    ...baseKeyScreen,
  },
  VERIFY_KEY_PROCESS_SCREEN: {
    screen: 'Pangea.VerifyKeyProcessScreen',
    title: 'Verify Private Key',
    ...baseKeyScreen,
  },
  LOAD_WALLET_SCREEN: {
    screen: 'Pangea.LoadWalletScreen',
    title: ' Load wallet ',
    ...baseKeyScreen,
  },
  INTRO_SCREEN: {
    screen: 'Pangea.Intro',
    navigatorStyle: hiddenNavigatorStyle,
  },
  RECEIVE_MONEY_SCREEN: {
    screen: 'Pangea.ReceiveMoneyScreen',
    title: 'Receive Money',
    navigatorStyle,
  },
  VERIFY_KEY_SUCCESS_SCREEN: {
    screen: 'Pangea.VerifyKeySuccess',
    title: 'Verify Private Key',
    ...baseKeyScreen,
  },
  SEND_MONEY_SCREEN: {
    screen: 'Pangea.SendMoneyScreen',
    title: 'Send money',
    navigatorStyle,
  },
  QR_CODE_SCANNER_SCREEN: {
    screen: 'Pangea.QRCodeScannerScreen',
    title: 'Scan QR code',
    navigatorStyle,
  },

};

export function screen(name) {
  return { ...Screens[name] };
}