/**
 * @desc Generates a standard native Switch with a Label at the right
 * @type React.Component
 * @param props.label {String} Text for the label
 * @param props.value {Boolean} State for the switch
 */

import React, { Component } from 'react';
import { Switch, View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';
import GlobalStyles from '../../global/Styles';
import Colors from '../../global/colors';

export default class SwitchLabeled extends Component {
  render() {
    const { onValueChange } = this.props;

    return (
      <View style={styles.formRow}>
        <View style={styles.switchContainer}>
          <Switch
            style={styles.switchObject}
            onTintColor={Colors.BitnationHighlightColor}
            onValueChange={onValueChange}
            value={this.props.value}
          />
          <Text style={styles.formSwitchLabelText}>{this.props.label}</Text>
        </View>
      </View>
    );
  }
}

SwitchLabeled.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
};

SwitchLabeled.defaultProps = {
  value: false,
  label: '',
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

});
