// @flow

import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Value to enable/disable the button.
   */
  disable?: boolean,
  /**
   * @desc Text label of the button.
   */
  title?: string,
  /**
   * @desc Callback to be called when button is pressed.
   */
  onPress?: () => void,
  /**
   * @desc Resource to be rendered as icon with the button.
   */
  iconSource?: number,
}

/**
 * @desc Component that renders the buttons used on the Nations Screens (icon + text)
 * @return {React.Component} A component.
 */

const NationActionButton = ({
  title, disable, iconSource, onPress,
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <View style={styles.tabBarButton} opacity={disable ? 0.4 : 1}>
      <TouchableOpacity
        style={[styles.tabBarContainer]}
        onPress={onPress}
        disabled={disable}
        activeOpacity={disable ? 1 : 0.4}
      >
        <Image source={iconSource} />
        <Text style={styles.tabBarTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

NationActionButton.defaultProps = {
  disable: true,
  title: '',
  iconSource: undefined,
  onPress: () => null,
};

export default NationActionButton;
