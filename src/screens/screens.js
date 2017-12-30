import { Navigation } from 'react-native-navigation';

//import Drawer from './modules/_global/Drawer';
import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';
import Dashboard from './Dashboard';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('Pangea.SplashScreen', () => SplashScreen, store, Provider);
    Navigation.registerComponent('Pangea.MainScreen', () => MainScreen, store, Provider);
    Navigation.registerComponent('Pangea.Dashboard', () => Dashboard, store, Provider);
}