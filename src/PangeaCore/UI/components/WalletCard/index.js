// @flow

import React from 'react';
import { Image, View } from 'react-native';
import { Button, Text } from 'native-base';
import styles from './styles';
import Images from 'pangea-common-reactnative/assets/AssetsImages';
import i18n from 'pangea-common/i18n';

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
  /**
   * @desc Callback on transactions button press
   */
  onTransactionPress: () => void,
};

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */
const WalletCard = ({
  imagePath,
  nameHeading,
  balance,
  onSendPress,
  onReceivePress,
  onTransactionPress,
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
          <Button onPress={onSendPress} style={styles.button}>
            <Text style={styles.buttonText}>{i18n.t('common.send')}</Text>
          </Button>
          <Button onPress={onReceivePress} style={styles.button}>
            <Text style={styles.buttonText}>{i18n.t('common.receive')}</Text>
          </Button>
          <Button
            onPress={onTransactionPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{i18n.t('common.transactions')}</Text>
          </Button>
        </View>
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
  onTransactionPress: () => null,
};

export default WalletCard;
