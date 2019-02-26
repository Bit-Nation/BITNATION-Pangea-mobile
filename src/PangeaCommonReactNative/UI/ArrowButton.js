// @flow

import * as React from 'react';

import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Button, Text } from 'native-base';

import GlobalStyles from '../styles';

type Props = {
  /**
   * @desc Style to be applied on top of default styles.
   */
  style?: any,

  /**
   * @desc Callback to be called on button press.
   */
  onPress?: () => void,
  /**
   * @desc Flag that determines if button is enabled.
   */
  enabled?: boolean,
  /**
   * @desc Title to show on button.
   */
  title?: string,
}

/**
 * @desc Component that renders common button.
 * @return {React.Component} A component.
 */
const ArrowButton = ({
  style, onPress, enabled, title, ...props
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return ((
    <Button
      style={[

        style,
      ]}
      {...props}
      testID='Touchable'
      enabled
      onPress={onPress}
    >

      <Text style={styles.arrowButtonTitle}>
        {title}
      </Text>
      {/* <MaterialIcons
          style={styles.arrowButtonIcon}
          name='keyboard-arrow-right'
        /> */}

    </Button>
  ));
};

Button.defaultProps = {
  style: undefined,
  enabled: true,
  onPress: () => null,
  title: '',
};

export default ArrowButton;
