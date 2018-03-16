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
   * @desc Callback to be called on Switch when changes value.
   */
  onValueChange?: () => void,
};

/**
 * @desc Generates a standard native Switch with a Label at the right
 * @type {React.Component} A component.
 */

const SwitchLabeled = ({ onValueChange, value, label }:Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });
  return (
    <View style={styles.formRow}>
      <View style={styles.switchContainer}>
        <Switch
          style={styles.switchObject}
          onTintColor={Colors.BitnationHighlightColor}
          onValueChange={onValueChange}
          value={value}
        />
        <Text style={styles.formSwitchLabelText}>{label}</Text>
      </View>
    </View>
  );
};

SwitchLabeled.defaultProps = {
  value: false,
  label: '',
  onValueChange: () => undefined,
};

export default SwitchLabeled;
