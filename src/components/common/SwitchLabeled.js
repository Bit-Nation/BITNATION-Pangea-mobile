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
  /**
   * @desc Swich disabled status
   */
  disabled?: boolean,
};

/**
 * @desc Generates a standard native Switch with a Label at the right
 * @return {React.Component} A component.
 */

const SwitchLabeled = ({ onValueChange, value, label, align, disabled }:Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  let switchStyle = [styles.switchContainer];
  if (align === 'right') {
    switchStyle.push({
      flexDirection: 'row-reverse'
    });
  }
  
  let textStyle = [styles.formSwitchLabelText];
  if (disabled) {
    textStyle.push(styles.disabledText);
  }

  return (
    <View style={styles.formRow}>
      <View style={switchStyle}>
        <Switch
          disabled={disabled}
          style={styles.switchObject}
          onTintColor={Colors.BitnationHighlightColor}
          onValueChange={onValueChange}
          value={value}
        />
        <Text style={textStyle}>{label}</Text>
      </View>
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
