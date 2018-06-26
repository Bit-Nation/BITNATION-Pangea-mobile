import React from 'react';
import { Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles';

const View = ({ onRead }: Object) => (
  <QRCodeScanner
    onRead={onRead}
    topContent={
      <Text style={styles.centerText}>Scan barcode to connect to PC</Text>
    }
  />
);

export default View;
