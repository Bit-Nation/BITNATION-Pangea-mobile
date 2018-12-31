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
  userUri,
  description,
  title,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri }} />
      {userUri ? (
        <View style={styles.photo}>
          <Image source={{ uri: userUri }} style={styles.userImage} />
        </View>
        ) : null}
      <View style={styles.bottom}>
        {description ? (
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {description}
          </Text>
          ) : null}
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
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
