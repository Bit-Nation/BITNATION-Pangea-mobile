import React from 'react';
import { Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles';
import Colors from '../../../global/colors';

const View = ({ onRead }: Object) => (
  <QRCodeScanner
    onRead={onRead}
    topContent={
      <Text style={styles.centerText}>Scan barcode to connect to PC</Text>
    }
  />
);

View.navigatorButtons = {
  leftButtons: [
    {
      id: 'cancel',
      title: 'Cancel',
      buttonColor: Colors.navigationButtonColor,
    },
  ],
  rightButtons: [],
};
export default View;
