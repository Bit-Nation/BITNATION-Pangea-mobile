import React, { Component } from 'react';
import { Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import Colors from '../../global/Colors';

export default class _Text extends React.Component {

  render() {
    const { style, children, ...props } = this.props;

    return (
      <Text
        style={[
          props.messageTitle && styles.messageTitle,
          props.messageText && styles.messageText,
          props.buttonTitle && styles.buttonTitle,
          props.disabledButtonTitle && styles.disabledButtonTitle,
          style,
        ]}
        {...props}>
        {children}
      </Text>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  messageTitle: {
    fontSize: 22,
    color: Colors.titleColor,
    letterSpacing: -0.89,
    lineHeight: 28,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: Colors.BitNationLightBlue,
    letterSpacing: -0.65,
    lineHeight: 20.8,
    textAlign: 'center',
  },
  buttonTitle: {
    fontSize: 14,
    color: Colors.BitNationLightBlue,
    letterSpacing: -0.02,
    lineHeight: 19,
    textAlign: 'center',
  },
  disabledButtonTitle: {
    fontSize: 14,
    color: Colors.disabledButtonTitleColor,
    letterSpacing: -0.02,
    lineHeight: 19,
    textAlign: 'center',
  },
});