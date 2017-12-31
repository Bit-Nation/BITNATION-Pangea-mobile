import React, { Component } from 'react';
import {
    Image,
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const BackgroundScreen = (props) => {
    return(
        <Image style={styles.backgroundScreen} resizeMode="contain"
        source={require('../../assets/images/background.png')}/>
    );
}

export default BackgroundScreen;