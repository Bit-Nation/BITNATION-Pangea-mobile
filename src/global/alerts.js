// @flow

import { Alert } from 'react-native';
import i18n from './i18n';

type TranslatableError = {
  transKey: string
}

/**
 * @desc Shows common error alert. Use this to show any error to user.
 * @param {Error} error Error to display
 * @return {void}
 */
export function errorAlert(error: Error | TranslatableError) {
  Alert.alert(
    i18n.t('alerts.error.title'),
    typeof error.transKey === 'string' ? i18n.t(`error.${error.transKey}`) : error.toString(),
    [
      { text: i18n.t('alerts.error.confirm') },
    ],
    { cancelable: false },
  );
}

type Button = {
  name: string,
  style?: any,
  onPress?: () => any,
}

/**
 * @desc Shows common alert, used to simplify common code for i18n.
 * @param {string} name Name of alert to determine texts for title, subtitle and buttons.
 * I18n is used to get corresponding texts.
 * @param {Button[]} buttons Array of buttons to display on alert.
 * @param {boolean} cancellable If alert is cancellable for Android.
 * @return {void}
 */
export function alert(name: string, buttons: Array<Button>, cancellable: boolean = false) {
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
