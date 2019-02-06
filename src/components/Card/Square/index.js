// @flow

import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

type Props = {
  /**
   * @desc Url of Image
   */
  uri: string,
};

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */

const CardSquare = ({
  uri,
}: Props) => (
  <View style={styles.card}>
    <Image style={styles.image} source={{ uri }} />
  </View>
);

export default CardSquare;

CardSquare.defaultProps = {
  uri: '',
  userUri: '',
  description: '',
  title: '',
  category: '',
};
