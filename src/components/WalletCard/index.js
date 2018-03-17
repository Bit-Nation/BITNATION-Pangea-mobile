// @flow

import React from 'react';
import {
  Text,
  Image,
  View,
} from 'react-native';

import styles from './styles';
import Images from '../../global/AssetsImages';
import Button from '../common/Button';
import i18n from '../../global/i18n';

type Props = {
  /**
   * @desc Name for the wallet
   */
  nameHeading: string,
  /**
   * @desc Balance of the wallet
   */
  balance: string,
  /**
   * @desc Image to be displayed
   */
  imagePath: string,
  /**
   * @desc Callback on send money button press
   */
  onSendPress: () => void,
  /**
   * @desc Callback on receive money button press
   */
  onReceivePress: () => void,
}

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */
const WalletCard = ({
  imagePath, nameHeading, balance, onSendPress, onReceivePress,
}: Props) => (
  <View style={styles.container}>

    <View style={styles.row}>
      <Image style={styles.icon} source={imagePath} resizeMode='contain' />

      <View style={styles.textColumn}>
        <View style={styles.spacer} />
        <Text style={styles.nameHeading}>{nameHeading}</Text>
        <Text style={styles.nameSubheading}>{balance}</Text>
        <View style={styles.spacer} />

        <View style={styles.buttonsContainer}>
          <Button title={i18n.t('common.send')} onPress={onSendPress} style={[styles.button, styles.leftButton]} />
          <Button title={i18n.t('common.receive')} onPress={onReceivePress} style={styles.button} />
          <View style={styles.spacer} />
        </View>

        <View style={styles.spacer} />
      </View>
    </View>

  </View>
);

WalletCard.defaultProps = {
  imagePath: Images.ethereumLogo,
  nameHeading: i18n.t('common.ethereum'),
  balance: '0',
  onSendPress: () => null,
  onReceivePress: () => null,
};

export default WalletCard;
