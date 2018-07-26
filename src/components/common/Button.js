// @flow

import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

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
}

/**
 * @desc Component that renders common button.
 * @return {React.Component} A component.
 */
const Button = ({
  style, children, onPress, enabled, styleTitle, title, ...props
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return ((
    <View
      style={[
          styles.baseButton,

          style,
        ]}
      {...props}
    >
      <TouchableOpacity testID='Touchable' disabled={!enabled} style={[styles.buttonContainer]} onPress={onPress}>
        {
        children ||
        <Text style={[styles.buttonTitle, styleTitle, (enabled === false) && styles.disabledButtonTitle]}>
          {title}
        </Text>
      }
      </TouchableOpacity>
    </View>
  ));
};

Button.defaultProps = {
  style: undefined,
  children: undefined,
  enabled: true,
  onPress: () => null,
  title: '',
};

export default Button;
