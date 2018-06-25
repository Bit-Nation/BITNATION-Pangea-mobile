import { compose, withState, withHandlers, hoistStatics } from 'recompose';
import { Alert } from 'react-native';
import View from './view';

export default hoistStatics(compose(
  withState('password', 'setPassword', ''),
  withHandlers({
    onRead: () => (result) => {
      Alert.alert(result.data);
    },
    onNavBarButtonPress: ({ navigator }) => (id) => {
      if (id === 'cancel') {
        navigator.dismissModal();
      }
    },
  }),
))(View);
