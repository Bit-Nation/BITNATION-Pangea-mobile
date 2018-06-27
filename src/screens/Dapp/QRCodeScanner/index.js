import React from 'react';

import { Alert, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import DAppsService from '../../../services/dapps';
import styles from './styles';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';

export default class DAppQRCodeScannerScreen extends NavigatorComponent {
  onNavBarButtonPress(id) {
    if (id === 'cancel') {
      this.props.navigator.pop();
    }
  }

  onReadQRCode = (address) => {
    DAppsService.connectToDAppHost(address).then(() => {
      Alert.alert('Success', null, [
        {
          text: i18n.t('common.ok'),
          onPress: () => { this.props.navigator.pop(); },
        },
      ]);
    }).catch((error) => {
      Alert.alert(`Connect failed with error ${error}`, null, [
        {
          text: i18n.t('common.ok'),
          onPress: () => {
            if (this.scanner) {
              this.scanner.reactivate();
            }
          },
        },
      ]);
    });
  };

  render() {
    return (
      <QRCodeScanner
        onRead={result => this.onReadQRCode(result.data)}
        topContent={
          <Text style={styles.centerText}>Scan barcode to connect to PC</Text>
        }
        ref={scanner => (this.scanner = scanner)}
      />
    );
  }
}
