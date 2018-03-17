/**
 * @desc Generates a standard native Switch with a Label at the right
 * @type React.Component
 * @param props.label {String} Text for the label
 * @param props.value {Boolean} State for the switch
 */

import React from 'react';
import { Switch, View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';
import GlobalStyles from '../../global/Styles';
import Colors from '../../global/colors';

const SwitchLabeled = ({ onValueChange, value, label }) => {
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

SwitchLabeled.propTypes = {
  /**
   * @desc Value of the Switch.
   * @type boolean
   */
  value: PropTypes.bool,
  /**
   * @desc Text label at the right of the Switch.
   * @type string
   */
  label: PropTypes.string,
  /**
   * @desc Callback to be called on Switch when changes value.
   * @type func
   */
  onValueChange: PropTypes.func,
};

SwitchLabeled.defaultProps = {
  value: false,
  label: '',
  onValueChange: () => null,
};

export default SwitchLabeled;
