import { Alert } from 'react-native';
import i18n from './i18n';

export function errorAlert(error) {
  Alert.alert(
    'ERROR',
    error.transKey,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
}

export function alert(name, buttons, cancellable = false) {
  Alert.alert(
    i18n.ifExists(`alerts.${name}.title`),
    i18n.ifExists(`alerts.${name}.subtitle`),
    buttons.map(button => ({
      text: i18n.t(`alerts.${name}.${button.name}`),
      style: button.style,
      onPress: button.onPress,
    })),
    { cancelable: cancellable },
  );
}