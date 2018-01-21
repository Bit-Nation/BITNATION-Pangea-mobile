import React, {Component} from 'react';
import { Switch, View, Text } from 'react-native';
import {MediaQueryStyleSheet} from "react-native-responsive";
import PropTypes from 'prop-types';
import GlobalStyles from '../../global/Styles';
import Colors from '../../global/Colors';

export default class SwitchLabeled extends Component {

  render() {
    const { onValueChange } = this.props;

    return (
      <View style={styles.formRow}>
        <View style={styles.containerStyle}>
          <Switch style={styles.switchStyle}
            onTintColor={Colors.BitnationColor}
            onValueChange={onValueChange}
            value={this.props.value}
          />
          <Text style={styles.footnote}>{this.props.label}</Text>
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
  label: ''
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    paddingRight: 40,
  },
  switchStyle: {
    marginRight: 10,
  }
});