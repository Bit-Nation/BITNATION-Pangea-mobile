import { Alert } from 'react-native';
import i18n from './i18n';

export function errorAlert(error) {
  Alert.alert(
    i18n.t('alerts.error.title'),
    error.transKey !== undefined ? i18n.t(`error.${error.transKey}`) : error.toString(),
    [
      { text: i18n.t('alerts.error.confirm') },
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
