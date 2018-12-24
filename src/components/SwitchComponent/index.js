/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const SwitchComponent = ({ containerStyle, buttons }) => (
  <View style={[styles.component, containerStyle]}>
    {buttons.map((button, index) => (
      <TouchableOpacity
        key={index.toString()}
        onPress={button.onPress}
        style={[styles.item, button.selected && styles.selectedItem]}
      >
        <Text numberOfLines={1} style={[styles.itemText, !button.selected && styles.selectText]}>{button.label}</Text>
      </TouchableOpacity>
        ))}
  </View>
);

SwitchComponent.propTypes = {
  containerStyle: PropTypes.object,
  buttons: PropTypes.shape({
    label: PropTypes.string,
    onPress: PropTypes.func,
    selected: PropTypes.bool,
  }),
};

export default SwitchComponent;
