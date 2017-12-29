import React, { Component } from 'react';
import {View} from 'react-native'
import configureStore from './src/config/configureStore';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens/screens';
import { Provider } from 'react-redux';

const store = configureStore();
registerScreens(store, Provider);

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

class App extends Component {
  render()
  {
    return(null);
  }
}
export default App;
