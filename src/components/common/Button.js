import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';

import Text from './Text';
import Colors from '../../global/Colors';
import GlobalStyles from '../../global/Styles';

export default class Button extends Component {

  render() {
    const { style, children, onPress, enabled, ...props } = this.props;

    return (
      <View style={[
        styles.baseButton,
        enabled ? styles.enabledButton : styles.disabledButton,
        style]
      } {...props}>
        {
          enabled ?
            <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
              {children || this._renderTitle()}
            </TouchableOpacity>
            :
            <View style={styles.buttonContainer}>
              {children || this._renderTitle()}
            </View>
        }

      </View>
    );
  }

  _renderTitle() {
    return (
      <Text buttonTitle={this.props.enabled} disabledButtonTitle={!this.props.enabled}>
        {this.props.title}
      </Text>
    );
  }

}

Button.propTypes = {
  enabled: PropTypes.bool
};

Button.defaultProps = {
  enabled: true,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

});