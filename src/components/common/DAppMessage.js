// @flow

/**
 * @desc Component that renders DAppMessages.
 * @type React.Component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Callback on press item.
   */
  onPress: any => void,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

const DAppMessage = ({ onPress }: Props) => (
  <View style={styles.sectionListItemContainer}>
    <TouchableOpacity testID='Touchable' onPress={() => onPress()} />
  </View>
);

DAppMessage.defaultProps = {
  onPress: () => null,
};

export default DAppMessage;
