// @flow

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

export type GovMarketItemProps = {
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
  /**
   * @desc Url of item
   */
  imageUri: string,

  onPress: Function,

  bannerImage: string,
};

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */

const GovMarketItem = ({
  imageUri,
  description,
  title,
  subTitle,
  onPress,
}: GovMarketItemProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Image source={imageUri} style={styles.avatarStyle} />
      <View style={styles.infoStyle}>
        <Text style={styles.descriptionText}>{description.toUpperCase()}</Text>
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default GovMarketItem;

GovMarketItem.defaultProps = {
  uri: '',
  description: '',
  title: '',
  subTitle: '',
};
