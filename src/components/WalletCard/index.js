
import React, { Component } from 'react';
import {Text,Image,View, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Images from '../../global/AssetsImages';

const WalletCard = (props) => {

  return (
    <View onPress={props.onPress} style = {styles.container}>
       
        <Text  style = {styles.title}>{props.title}
        </Text>
        <Text  style = {styles.description}>
            {props.description}
        </Text>     
    </View> 
  )
}

WalletCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
  };

  WalletCard.defaultProps = {
    title:'' ,
    description: '',
    onPress: () => null,
  };

export default WalletCard;
