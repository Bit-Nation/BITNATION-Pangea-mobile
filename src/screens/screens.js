import { Navigation } from 'react-native-navigation';

//import Drawer from './modules/_global/Drawer';
import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';


export function registerScreens(store, Provider) {
    Navigation.registerComponent('Pangea.SplashScreen', () => SplashScreen, store, Provider);
    Navigation.registerComponent('Pangea.MainScreen', () => MainScreen, store, Provider);
}