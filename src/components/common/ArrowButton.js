// @flow

import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import GlobalStyles from '../../global/Styles';

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
const Button = ({
  style, onPress, enabled, title, ...props
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
      <TouchableOpacity testID='Touchable' disabled={!enabled} style={styles.arrowButtonContainer} onPress={onPress}>
        <Text style={enabled ? styles.arrowButtonTitle : styles.disabledArrowButtonTitle}>
          {title}
        </Text>
        <MaterialIcons
          style={styles.arrowButtonIcon}
          name='keyboard-arrow-right'
        />
      </TouchableOpacity>
    </View>
  ));
};

Button.defaultProps = {
  style: undefined,
  enabled: true,
  onPress: () => null,
  title: '',
};

export default Button;
