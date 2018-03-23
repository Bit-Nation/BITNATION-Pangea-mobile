// @flow

import { BackHandler, Alert } from 'react-native';

import Colors from '../../../global/colors';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';
import type { NavigatorEvent } from '../../../types/ReactNativeNavigation';
import type { Mnemonic } from '../../../types/Mnemonic';

type KeyProps = {
  /**
   * @desc Function to abort private key creation process.
   */
  +removePrivateKey?: () => void,
  /**
   * @desc Current mnemonic used in private key creation process.
   */
  +createdMnemonic?: Mnemonic | null,
};

export default class KeyBaseScreen<Props: KeyProps, State = void>
  extends NavigatorComponent<Props, State> {
  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: i18n.t('common.cancel'),
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressHandler);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressHandler);
  }

  backPressHandler = () => {
    this.onCancel();
    return false;
  };

  onNavigatorEvent(event: NavigatorEvent) {
    if (event.id === 'backPress') {
      this.onCancel();
    }

    super.onNavigatorEvent(event);
  }

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.onCancel();
    }
  }

  get shouldShowCancelAlert(): boolean {
    return this.props.createdMnemonic !== null && this.props.createdMnemonic !== undefined;
  }

  onCancel() {
    if (!this.shouldShowCancelAlert) {
      this.onCancelConfirmed();
    } else {
      Alert.alert(
        i18n.t('alerts.abortKeyCreateProcess.title'),
        i18n.t('alerts.abortKeyCreateProcess.subtitle'),
        [
          { text: i18n.t('alerts.abortKeyCreateProcess.cancel'), style: 'cancel' },
          {
            text: i18n.t('alerts.abortKeyCreateProcess.confirm'),
            style: 'destructive',
            onPress: () => this.onCancelConfirmed(),
          },
        ],
        { cancelable: true },
      );
    }
  }

  onCancelConfirmed() {
    if (typeof this.props.removePrivateKey === 'function') {
      this.props.removePrivateKey();
    }

    if (this.props.navigator != null) {
      this.props.navigator.dismissModal();
    }
  }
}
