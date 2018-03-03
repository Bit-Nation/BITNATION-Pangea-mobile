
import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const TextBox = props => (
  <View onPress={props.onPress} style={styles.container}>

    <Text style={styles.title}>{props.title}
    </Text>
    <Text style={styles.description}>
      {props.description}
    </Text>
  </View>
);

TextBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onPress: PropTypes.func,
};

TextBox.defaultProps = {
  title: '',
  description: '',
  onPress: () => null,
};

export default TextBox;
