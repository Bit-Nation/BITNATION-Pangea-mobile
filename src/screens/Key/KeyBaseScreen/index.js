import { BackHandler, Alert } from 'react-native';

import Colors from '../../../global/colors';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';

export default class KeyBaseScreen extends NavigatorComponent {
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

  onNavigatorEvent(event) {
    if (event.id === 'backPress') {
      this.onCancel();
    }

    super.onNavigatorEvent(event);
  }

  onNavBarButtonPress(id) {
    if (id === 'cancel') {
      this.onCancel();
    }
  }

  get shouldShowCancelAlert() {
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
    if (this.props.removePrivateKey) {
      this.props.removePrivateKey();
    }
    this.props.navigator.dismissModal();
  }
}
