// @flow

import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../styles';
import AssetsImages from '../assets/AssetsImages';

type Props = {
  /**
   * @desc Callback to be called on button press.
   */
  onPress?: () => any,
  /**
   * @desc style of lucy button
   */
  style?: any,
}

/**
 * @desc Component that renders common button.
 * @return {React.Component} A component.
 */
const LucyButton = ({
  onPress, style,
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
    lucyButtonImage: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });

  return ((
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.lucyButton, style]}
      onPress={onPress}
    >
      <Image source={AssetsImages.lucyIcon} />
    </TouchableOpacity>
  ));
};

LucyButton.defaultProps = {
  onPress: undefined,
};

export default LucyButton;
