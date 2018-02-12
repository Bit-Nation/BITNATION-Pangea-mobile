import AssetsImages from './AssetsImages';
import Colors from './colors';
import { Platform } from 'react-native';
import i18n from './i18n';

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
    buttonColor: Colors.androidNavigationButtons,
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
  navBarTextColor: Colors.navBarTextColor,
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

export const navigatorStyleModal = {
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
  tabBarHidden: true,
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
    title: i18n.t('screens.splash.title'),
  },
  DASHBOARD_SCREEN: {
    screen: 'Pangea.DashboardScreen',
    label: i18n.t('screens.dashboard.tabTitle'),
    icon: AssetsImages.TabIcons.dashboard,
    navigatorStyle: hiddenNavigatorStyle,
  },
  CHAT_SCREEN: {
    screen: 'Pangea.ChatScreen',
    label: i18n.t('screens.chat.tabTitle'),
    icon: AssetsImages.TabIcons.chat,
    title: i18n.t('screens.chat.title'),
    navigatorStyle: hiddenNavigatorStyle,
  },
  NATIONS_SCREEN: {
    screen: 'Pangea.NationsScreen',
    label: i18n.t('screens.nations.tabTitle'),
    icon: AssetsImages.TabIcons.nations,
    title: '',
    navigatorStyle,
  },
  NATION_DETAILS_SCREEN: {
    screen: 'Pangea.NationDetailsScreen',
    title: '',
    navigatorStyle: navigatorStyleModal,
  },
  NATION_CREATE_SCREEN: {
    screen: 'Pangea.NationCreateScreen',
    title: '',
    navigatorStyle,
  },
  WALLET_SCREEN: {
    screen: 'Pangea.WalletScreen',
    label: i18n.t('screens.wallet.tabTitle'),
    icon: AssetsImages.TabIcons.wallet,
    title: i18n.t('screens.wallet.title'),
    navigatorStyle,
  },
  PROFILE_SCREEN: {
    screen: 'Pangea.ProfileScreen',
    label: i18n.t('screens.profile.tabTitle'),
    icon: AssetsImages.TabIcons.profile,
    title: i18n.t('screens.profile.title'),
    navigatorStyle,
  },
  CREATE_KEY_INTRODUCTION_SCREEN: {
    screen: 'Pangea.CreateKeyIntroductionScreen',
    title: i18n.t('screens.createKey.title'),
    ...baseKeyScreen,
  },
  CREATE_KEY_INSTRUCTION_SCREEN: {
    screen: 'Pangea.CreateKeyInstructionScreen',
    title: i18n.t('screens.createKey.title'),
    ...baseKeyScreen,
  },
  CREATE_KEY_PROCESS_SCREEN: {
    screen: 'Pangea.CreateKeyProcessScreen',
    title: i18n.t('screens.createKey.title'),
    ...baseKeyScreen,
  },
  VERIFY_KEY_INSTRUCTION_SCREEN: {
    screen: 'Pangea.VerifyKeyInstructionScreen',
    title: i18n.t('screens.verifyKey.title'),
    ...baseKeyScreen,
  },
  VERIFY_KEY_PROCESS_SCREEN: {
    screen: 'Pangea.VerifyKeyProcessScreen',
    title: i18n.t('screens.verifyKey.title'),
    ...baseKeyScreen,
  },
  LOAD_WALLET_SCREEN: {
    screen: 'Pangea.LoadWalletScreen',
    title: i18n.t('screens.loadWallet.title'),
    ...baseKeyScreen,
  },
  INTRO_SCREEN: {
    screen: 'Pangea.Intro',
    navigatorStyle: hiddenNavigatorStyle,
  },
  RECEIVE_MONEY_SCREEN: {
    screen: 'Pangea.ReceiveMoneyScreen',
    title: i18n.t('screens.receiveMoney.title'),
    navigatorStyle,
  },
  VERIFY_KEY_SUCCESS_SCREEN: {
    screen: 'Pangea.VerifyKeySuccess',
    title: i18n.t('screens.verifyKey.title'),
    ...baseKeyScreen,
  },
  SEND_MONEY_SCREEN: {
    screen: 'Pangea.SendMoneyScreen',
    title: i18n.t('screens.sendMoney.title'),
    navigatorStyle,
  },
  QR_CODE_SCANNER_SCREEN: {
    screen: 'Pangea.QRCodeScannerScreen',
    title: i18n.t('screens.scanQRCode.title'),
    navigatorStyle,
  },

};

export function screen(name) {
  return { ...Screens[name] };
}