// @flow

import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

type Props = {
  /**
   * @desc Url of Image
   */
  uri: string,
  /**
   * @desc Description to be displayed
   */
  description: string,
  /**
   * @desc Title of tab
   */
  title: string,
  /**
   * @desc subTitle of tab
   */
  subTitle: string,
};

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */

const GovMarketItem = ({
  uri, description, title, subTitle,
}: Props) => (
  <View style={styles.container}>
    <Image source={{ uri }} style={styles.avatarStyle} />
    <View style={styles.infoStyle}>
      <Text style={styles.descriptionText}>{description}</Text>
      <Text>{title}</Text>
      <Text>{subTitle}</Text>
    </View>
  </View>
);

export default GovMarketItem;

GovMarketItem.defaultProps = {
  uri: '',
  description: '',
  title: '',
  subTitle: '',
};
