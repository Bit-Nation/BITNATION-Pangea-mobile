import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import './shim';

import App from './App';

AppRegistry.registerComponent('Pangea', () => codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
})(App));
