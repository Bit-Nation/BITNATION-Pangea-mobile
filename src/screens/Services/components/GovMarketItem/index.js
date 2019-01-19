// @flow

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

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

  onPress: Function,
};

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */

const GovMarketItem = ({
  uri, description, title, subTitle, onPress,
}: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.avatarStyle} />
      <View style={styles.infoStyle}>
        <Text style={styles.descriptionText}>{description}</Text>
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
