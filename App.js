import { Provider } from 'react-redux';
import React, { Component } from 'react';
import configureStore from './src/config/configureStore';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens/screens';

const App = () => {
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

}
export default App();