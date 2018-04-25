// @flow

import { Platform } from 'react-native';

import AssetsImages from './AssetsImages';
import Colors from './colors';
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
  ...tabsStyle,
};

export const androidNavigationButtons = Platform.OS === 'android' ? {
  leftButtons: [{
    id: 'back',
    buttonColor: Colors.androidNavigationButtons,
  }],
} : {};

export const navigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? Colors.statusBarColorIOS : Colors.statusBarColorOther, // Nativebase variable!
  navBarBackgroundColor: Colors.navBarBackgroundColor,
  navBarTransparent: true,
  navBarBlur: false, // blur is too light
  navBarTranslucent: true,
  navBarNoBorder: true,
  drawUnderNavBar: true,
  drawUnderStatusBar: false, // Apple says, don't do it. So we don't.
  navBarTextColor: Colors.navBarTextColor,
  navBarButtonColor: Colors.navBarButtonColor,
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background-gray.jpg',
};

export const hiddenNavigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? Colors.statusBarColorIOS : Colors.statusBarColorOther,
  navBarHidden: true,
  drawUnderStatusBar: false, // Apple says, don't do it. So we don't.
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background-gray.jpg',
};

export const navigatorStyleModal = {
  ...navigatorStyle,
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
  title : title in navigation bar
 */

const Screens = {
  ACCOUNTS_SCREEN: {
    screen: 'Pangea.AccountsScreen',
    title: i18n.t('screens.accounts.title'),
    navigatorStyle: hiddenNavigatorStyle,
  },
  ACCOUNT_CREATE_SCREEN: {
    screen: 'Pangea.AccountCreateScreen',
    title: i18n.t('screens.accounts.create.title'),
    navigatorStyle: hiddenNavigatorStyle,
  },
  ACCOUNT_CREATE_DEVELOPER_SETTINGS: {
    screen: 'Pangea.AccountCreateDeveloperSettingsScreen',
    title: i18n.t('screens.accounts.create.developerTitle'),
    navigatorStyle: hiddenNavigatorStyle,
  },
  ACCOUNT_RESTORE_SCREEN: {
    screen: 'Pangea.AccountRestoreScreen',
    title: i18n.t('screens.accounts.restore.title'),
    navigatorStyle: hiddenNavigatorStyle,
  },
  DASHBOARD_SCREEN: {
    screen: 'Pangea.DashboardScreen',
    label: i18n.t('screens.dashboard.tabTitle'),
    icon: AssetsImages.TabIcons.dashboard,
    navigatorStyle: hiddenNavigatorStyle,
  },
  CHAT_SCREEN: {
    screen: 'Pangea.ChatScreen',
    title: i18n.t('screens.chat.title'),
    navigatorStyle,
  },
  CHAT_NATIONS_SCREEN: {
    screen: 'Pangea.ChatNationsScreen',
    label: i18n.t('screens.chat.tabTitle'),
    icon: AssetsImages.TabIcons.chat,
    title: '',
    navigatorStyle,
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
    title: '', // To show, use i18n.t('screens.wallet.title'),
    navigatorStyle,
  },
  PROFILE_SCREEN: {
    screen: 'Pangea.ProfileScreen',
    label: i18n.t('screens.profile.tabTitle'),
    icon: AssetsImages.TabIcons.profile,
    title: '', // i18n.t('screens.profile.title'),
    navigatorStyle,
  },
  CREATE_KEY_INTRODUCTION_SCREEN: {
    screen: 'Pangea.CreateKeyIntroductionScreen',
    title: '', // i18n.t('screens.createKey.title'),
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
    title: '',
    ...baseKeyScreen,
  },
  INTRO_SCREEN: {
    screen: 'Pangea.Intro',
    navigatorStyle: hiddenNavigatorStyle,
  },
  RECEIVE_MONEY_SCREEN: {
    screen: 'Pangea.ReceiveMoneyScreen',
    title: '',
    navigatorStyle,
  },
  VERIFY_KEY_SUCCESS_SCREEN: {
    screen: 'Pangea.VerifyKeySuccess',
    title: i18n.t('screens.verifyKey.title'),
    ...baseKeyScreen,
  },
  SEND_MONEY_SCREEN: {
    screen: 'Pangea.SendMoneyScreen',
    title: '',
    navigatorStyle,
  },
  QR_CODE_SCANNER_SCREEN: {
    screen: 'Pangea.QRCodeScannerScreen',
    title: i18n.t('screens.scanQRCode.title'),
    navigatorStyle,
  },

};

/**
 * @desc Returns and object that represents a screen in React Native Navigation library.
 * @param {string} name Name of the screen. Check Screens constant above for possible names.
 * @return {Object} A screen object.
 */
export function screen(name: string): Object {
  return { ...Screens[name] };
}
