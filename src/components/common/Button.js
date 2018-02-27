import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';

import GlobalStyles from '../../global/Styles';

/**
 * @desc Component that renders common button.
 * @type React.Component
 */
export default class Button extends Component {
  render() {
    const {
      style, children, onPress, enabled, ...props
    } = this.props;

    return (
      <View
        style={[
        styles.baseButton,
        enabled ? styles.enabledButton : styles.disabledButton,
        style]}
        {...props}
      >

        {
          <TouchableOpacity testID='Touchable' disabled={!enabled} style={[styles.buttonContainer]} onPress={onPress}>
            {children || this._renderTitle()}
          </TouchableOpacity>
        }

      </View>
    );
  }

  _renderTitle() {
    return (
      <Text style={this.props.enabled ? styles.buttonTitle : styles.disabledButtonTitle}>
        {this.props.title}
      </Text>
    );
  }
}

Button.propTypes = {
  /**
   * @desc Flag that determines if button is enabled.
   * @type bool
   */
  enabled: PropTypes.bool,
  /**
   * @desc Callback to be called on button press.
   * @type func
   */
  onPress: PropTypes.func,
  /**
   * @desc Title to show on button.
   * @type string
   */
  title: PropTypes.string,
};

Button.defaultProps = {
  enabled: true,
  onPress: () => null,
  title: '',
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});
