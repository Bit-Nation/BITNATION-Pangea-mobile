// @flow

import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Title of screen to be displayed.
   */
  title: string,
};

/**
 * @desc Component that renders common screen title. It is used to show large titles.
 * @return {React.Component} A component.
 */

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

const ScreenTitle = ({ title }: Props) => (
  <View style={styles.titleContainer}>
    <View style={styles.titleBarLarge}>
      <Text style={styles.largeTitle}>{title}</Text>
    </View>
  </View>
);

export default ScreenTitle;
