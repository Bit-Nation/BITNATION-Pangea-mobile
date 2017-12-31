import { Provider } from 'react-redux';
import React, { Component } from 'react';
import configureStore from './src/config/configureStore';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens/screens';

const store = configureStore();
registerScreens(store, Provider);

const navigatorStyle = { navBarHidden: true }
Navigation.startSingleScreenApp({
  screen: {
    screen: 'Pangea.EnterPrivateKeyScreen',
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
