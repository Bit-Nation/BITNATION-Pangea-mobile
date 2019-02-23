import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

const BaseComponent = ({ index, data, label }) => (
  <View style={styles.container}>
    {
      index === -1 ?
        <Text style={styles.itemSelectText}>{label}</Text> :
        data[index]
    }
    <View style={styles.accessory}>
      <Entypo name='triangle-down' style={styles.triangle} />
    </View>
  </View>
);

BaseComponent.defaultProps = {
  color: 'transparent',
  data: [],
  label: '',
};

BaseComponent.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

export default BaseComponent;
