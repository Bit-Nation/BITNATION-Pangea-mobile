import { Provider } from 'react-redux';
import asyncToGenerator from 'async-to-generator';

import configureStore from './src/config/configureStore';
import registerScreens from './src/screens/screens';
import { startNavigation } from './src/actions/navigation';

// Fix for https://github.com/Bit-Nation/BITNATION-Pangea-mobile/issues/166
// Related with https://github.com/facebook/react-native/issues/4844
// @todo Change that to more appropriate solution
// eslint-disable-next-line no-undef
babelHelpers.asyncToGenerator = asyncToGenerator;

const store = configureStore();
registerScreens(store, Provider);
store.dispatch(startNavigation());

const App = () => null;

export default App;
