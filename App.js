import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import configureStore from './src/config/configureStore';
import { registerScreens } from './src/screens/screens';
import Screens, { appStyle, tabsStyle } from './src/global/Screens';

const store = configureStore();
registerScreens(store, Provider);

// const navigatorStyle = { navBarHidden: true }
Navigation.startTabBasedApp({
  tabs: [               
    Screens.DASHBOARD_SCREEN, 
    Screens.WALLET_LIST_SCREEN,
    Screens.NATIONS_SCREEN,
    Screens.WALLET_SCREEN,
    Screens.PROFILE_SCREEN,
    Screens.VarifyKeyStep3,
  ],
  tabsStyle,
  appStyle,
});

class App extends Component {
  render() {
    return null;
  }
}

export default App;
