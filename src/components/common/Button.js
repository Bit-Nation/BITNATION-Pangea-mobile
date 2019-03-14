// @flow

import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Button, Text } from 'native-base';
import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Style to be applied on top of default styles.
   */
  style?: any,

  styleTitle?: any,
  /**
   * @desc Component(s) to be rendered inside a button.
   */
  children?: React.Node,
  /**
   * @desc Callback to be called on button press.
   */
  onPress?: () => any,
  /**
   * @desc Flag that determines if button is enabled.
   */
  enabled?: boolean,
  /**
   * @desc Title to show on button.
   */
  title?: string,
  /**
   * @desc Loading Indicator.
   */
  loading?: boolean,
}

/**
 * @desc Component that renders common button.
 * @return {React.Component} A component.
 */
const CustomButton = ({
  style, children, onPress, enabled = true, styleTitle, title, loading, ...props
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return ((
    <Button
      {...props}
      style={[
          styles.baseButton,

          style,
        ]}
      testID='Touchable'
      disabled={!enabled}

      onPress={onPress}
    >

      {
        children ||
        <Text style={[styles.buttonTitle, styleTitle, (enabled === false) && styles.disabledButtonTitle]}>
          {title}
        </Text>
        }
      {loading && <ActivityIndicator color='#fff' />}

    </Button>
  ));
};

Button.defaultProps = {
  style: undefined,
  children: undefined,
  enabled: true,
  onPress: () => null,
  title: '',
};

export default CustomButton;
