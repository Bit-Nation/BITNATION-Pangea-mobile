import React, { Component } from 'react';
import { Alert } from 'react-native';

import Colors from '../../../global/Colors';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import { removePrivateKey } from '../../../actions/key';

export default class KeyBaseScreen extends NavigatorComponent {

  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: 'Cancel',
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
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
        'Delete Private Key',
        'Are you sure that you want to stop creating this private key?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete Key', style: 'destructive',
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