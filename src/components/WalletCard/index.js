import React, { Component } from 'react';
import {
  ListView, Text, Image,
  View, TouchableOpacity
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Images from '../../global/AssetsImages';
import Button from '../common/Button';

const WalletCard = (props) => {

  return (
    <View style={styles.container}>

      <View style={styles.row}>
        <Image style={styles.icon} source={props.imagePath}/>

        <View style={styles.textColumn}>
          <View style={styles.spacer}/>
          <Text style={styles.nameHeading}>{props.nameHeading}</Text>
          <Text style={styles.nameSubheading}>{props.balance}</Text>
          <View style={styles.spacer}/>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Button title='Send' onPress={props.onSendPress} style={[styles.button, { marginRight: 8 }]}/>
            <Button title='Receive' onPress={props.onReceivePress} style={styles.button}/>
            <View style={styles.spacer}/>
          </View>

          <View style={styles.spacer}/>
          <Text style={styles.messageText}>{props.messageText}</Text>
        </View>

      </View>

    </View>
  );
};

WalletCard.propTypes = {
  imagePath: PropTypes.number,
  nameHeading: PropTypes.string,
  nameSubheading: PropTypes.string,
  messageText: PropTypes.string,
  onSendPress: PropTypes.func,
  onReceivePress: PropTypes.func,
};

WalletCard.defaultProps = {
  imagePath: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
  nameHeading: 'Ethernum',
  nameSubheading: '173324 Enum',
  messageText: 'Message goes here',
  onSendPress: () => null,
  onReceivePress: () => null,
};


export default WalletCard;
