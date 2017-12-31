import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
<<<<<<< HEAD
import {View} from 'react-native'
import configureStore from './src/config/configureStore';
import { registerScreens } from './src/screens/screens';
import Screens, { appStyle, tabsStyle } from './src/global/Screens';

=======

import configureStore from './src/config/configureStore';
import { registerScreens } from './src/screens/screens';
import Screens, { appStyle, tabsStyle } from './src/global/Screens';
>>>>>>> develop

const store = configureStore();
registerScreens(store, Provider);

Navigation.startTabBasedApp({
  tabs: [
    Screens.DASHBOARD_SCREEN,
    Screens.CHAT_SCREEN,
    Screens.NATIONS_SCREEN,
    Screens.WALLET_SCREEN,
    Screens.PROFILE_SCREEN,
  ],
  tabsStyle,
  appStyle,
<<<<<<< HEAD
});

class App extends Component {
  render() {
    return null;
  }
}

// THis needs to be implemented in xcode so it occurs without latency and in a manner that doesn't
// defeat the nav render. It's here for now as a placeholder.
/**

const navigatorStyle = {
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navigationBarColor: 'black',
  navBarBackgroundColor: '#0a0a0a',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  tabBarButtonColor: 'red',
  tabBarSelectedButtonColor: 'red',
  tabBarBackgroundColor: 'white'
};



Navigation.startSingleScreenApp({
  screen: {
    screen: 'Pangea.SplashScreen',
    title: 'Splash',
    navigatorStyle
  },
=======
>>>>>>> develop
});
**/

<<<<<<< HEAD

export default App;
=======
class App extends Component {
  render() {
    return null;
  }
}

export default App;
>>>>>>> develop
