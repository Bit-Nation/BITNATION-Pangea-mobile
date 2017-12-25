
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

const route = (Platform.OS === 'ios') ? 'SplashScreen' : 'SplashScreen';
const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: route,
    }),
  ],
}));

export default function (state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}
