/**
 * @desc Generates a "Card" for display a Wallet on screen with Name, Balance and Send/Receive buttons
 * @type React.Component
 *
 * @param props.nameHeading     {String} Name for the wallet
 * @param props.balance         {String} Balance of the wallet
 * @param props.imagePath       {String} Path to image to be displayed
 * @param props.messageText     {String} Text to be displayed below the wallet
 * @param props.onSendPress     {Button} Button to send ETH transactions
 * @param props.onReceivePress  {Button} Button to receive ETH transactions
 */

import React, { Component } from 'react';
import {
  ListView, Text, Image,
  View, TouchableOpacity,
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Images from '../../global/AssetsImages';
import Button from '../common/Button';
import i18n from '../../global/i18n';

const WalletCard = props => (
  <View style={styles.container}>

    <View style={styles.row}>
      <Image style={styles.icon} source={props.imagePath} resizeMode='contain' />

      <View style={styles.textColumn}>
        <View style={styles.spacer} />
        <Text style={styles.nameHeading}>{props.nameHeading}</Text>
        <Text style={styles.nameSubheading}>{props.balance}</Text>
        <View style={styles.spacer} />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Button title={i18n.t('common.send')} onPress={props.onSendPress} style={[styles.button, { marginRight: 8 }]} />
          <Button title={i18n.t('common.receive')} onPress={props.onReceivePress} style={styles.button} />
          <View style={styles.spacer} />
        </View>

        <View style={styles.spacer} />
      </View>

    </View>

  </View>
);

WalletCard.propTypes = {
  imagePath: PropTypes.number,
  nameHeading: PropTypes.string,
  nameSubheading: PropTypes.string,
  onSendPress: PropTypes.func,
  onReceivePress: PropTypes.func,
};

WalletCard.defaultProps = {
  imagePath: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
  nameHeading: i18n.t('common.ethereum'),
  nameSubheading: '173324 Enum',
  onSendPress: () => null,
  onReceivePress: () => null,
};


export default WalletCard;
