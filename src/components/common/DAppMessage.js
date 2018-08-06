// @flow

/**
 * @desc Component that renders DAppMessages.
 * @type React.Component
 */

import React from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   *
   * @desc Message to be displayed.
   */
  message: string,
  /**
   *
   * @desc Time to be displayed.
   */
  time: string,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

const DAppMessage = ({
  time, message,
}: Props) => (
  <View style={styles.dAppMessage}>
    <Text style={styles.dAppMessageTime}>
      {time}
    </Text>
    <Text style={styles.dAppMessageText} numberOfLines={1}>
      {message}
    </Text>
  </View>
);

export default DAppMessage;
