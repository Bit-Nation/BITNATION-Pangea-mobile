import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {View} from 'react-native'
import configureStore from './src/config/configureStore';
import { registerScreens } from './src/screens/screens';
import Screens, { appStyle, tabsStyle } from './src/global/Screens';


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
});

class App extends Component {
  render() {
    return null;
  }
}

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
});



export default App;
