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
  /**
   * @desc userImage
   */
  userUri: string,
  /**
   * @desc Description to be displayed
   */
  description: string,
  /**
   * @desc Title of card
   */
  title: string,
};

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */

const CardSquare = ({
  uri,
  file,
  userUri,
  description,
  title,
}: Props) => (
  <View style={styles.card}>
    {file !== '' ?
        <Image style={styles.image} source={{ uri }} />
        :
        <Image style={styles.image} spurce={file} />
      }
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
