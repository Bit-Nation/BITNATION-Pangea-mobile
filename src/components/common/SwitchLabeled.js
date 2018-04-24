// @flow

import React from 'react';
import { Switch, View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';
import Colors from '../../global/colors';

type Props = {
  /**
   * @desc Value of the Switch.
   */
  value?: boolean,
  /**
   * @desc Text label at the right of the Switch.
   */
  label?: string,
  /**
   * @desc Switch alignment
   */
  align?: string,
  /**
   * @desc Callback to be called on Switch when changes value.
   */
  onValueChange?: () => void,
};

/**
 * @desc Generates a standard native Switch with a Label at the right
 * @return {React.Component} A component.
 */

const SwitchLabeled = ({ onValueChange, value, label, align }:Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });
  return (
    <View style={styles.formRow}>
      {
        align === 'left' &&
        <View style={styles.switchContainer}>
          <Switch
            style={styles.switchObject}
            onTintColor={Colors.BitnationHighlightColor}
            onValueChange={onValueChange}
            value={value}
          />
          <Text style={styles.formSwitchLabelText}>{label}</Text>
        </View>
      }
      {
        align === 'right' &&
        <View style={[styles.switchContainer, styles.flexEnd]}>
          <Text style={styles.formSwitchLabelText}>{label}</Text>
          <Switch
            style={styles.switchObject}
            onTintColor={Colors.BitnationHighlightColor}
            onValueChange={onValueChange}
            value={value}
          />
        </View>
      }
    </View>
  );
};

SwitchLabeled.defaultProps = {
  value: false,
  label: '',
  align: 'left',
  onValueChange: () => undefined,
};

export default SwitchLabeled;
