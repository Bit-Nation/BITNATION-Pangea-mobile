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
/*
  Documentation:
  
  navBarTextColor: '#000000', // change the text color of the title (remembered across pushes)
  navBarTextFontSize: 18, // change the font size of the title
  navBarTextFontFamily: 'font-name', // Changes the title font
  navBarBackgroundColor: '#f7f7f7', // change the background color of the nav bar (remembered across pushes)
  navBarCustomView: 'example.CustomTopBar', // registered component name
  navBarComponentAlignment: 'center', // center/fill
  navBarCustomViewInitialProps: {}, // navBar custom component props
  navBarButtonColor: '#007aff', // Change color of nav bar buttons (eg. the back button) (remembered across pushes)
  topBarElevationShadowEnabled: false, // (Android - default: true, iOS - default: false). Disables TopBar elevation shadow on Lolipop and above
  navBarHidden: false, // make the nav bar hidden
  navBarHideOnScroll: false, // make the nav bar hidden only after the user starts to scroll
  navBarTranslucent: false, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
  navBarTransparent: false, // make the nav bar transparent, works best with drawUnderNavBar:true,
  navBarNoBorder: false, // hide the navigation bar bottom border (hair line). Default false
  drawUnderNavBar: false, // draw the screen content under the nav bar, works best with navBarTranslucent:true
  drawUnderTabBar: false, // draw the screen content under the tab bar (the tab bar is always translucent)
  navBarBlur: false, // blur the entire nav bar, works best with drawUnderNavBar:true
  tabBarHidden: false, // make the screen content hide the tab bar (remembered across pushes)
  statusBarHidden: false, // make the status bar hidden regardless of nav bar state
  statusBarTextColorScheme: 'dark', // text color of status bar, 'dark' / 'light' (remembered across pushes)
  navBarSubtitleColor: 'red', // subtitle color
  navBarSubtitleFontFamily: 'font-name', // subtitle font, 'sans-serif-thin' for example
  navBarSubtitleFontSize: 13, // subtitle font size
  screenBackgroundColor: 'white', // Default screen color, visible before the actual react view is rendered
  orientation: 'portrait' // Sets a specific orientation to a modal and all screens pushed to it. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
  disabledButtonColor: '#ff0000' // chnaged the navigation bar button text color when disabled.
 
 rootBackgroundImageName: '<name of image in Images.xcassets>', // Static while you transition between screens. Works best with screenBackgroundColor: 'transparent'
 */
export const navigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? Colors.statusBarColorIOS : Colors.statusBarColorOther,    // Nativebase variable!
	navBarBackgroundColor: Colors.navBarBackgroundColor,
  navBarTransparent: Colors.navBarTransparent,
  navBarBlur: false,  // blur is too light
  navBarTranslucent: Colors.navBarTranslucent,
  navBarNoBorder: Colors.navBarNoBorder,
  drawUnderNavBar: true,
  drawUnderStatusBar: false,  // Apple says, don't do it. So we don't.
  navBarTextColor: Colors.navBarTextColor,
	navBarButtonColor: Colors.navBarButtonColor,
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background-gray.jpg',
};

export const hiddenNavigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? Colors.statusBarColorIOS : Colors.statusBarColorOther,
  navBarHidden: true,
  drawUnderStatusBar: false,  // Apple says, don't do it. So we don't.
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
    title: '',    //To show, use i18n.t('screens.wallet.title'),
    navigatorStyle,
  },
  PROFILE_SCREEN: {
    screen: 'Pangea.ProfileScreen',
    label: i18n.t('screens.profile.tabTitle'),
    icon: AssetsImages.TabIcons.profile,
    title: '',//i18n.t('screens.profile.title'),
    navigatorStyle,
  },
  CREATE_KEY_INTRODUCTION_SCREEN: {
    screen: 'Pangea.CreateKeyIntroductionScreen',
    title: '',  //i18n.t('screens.createKey.title'),
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