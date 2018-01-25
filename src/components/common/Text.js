import React, { Component } from 'react';
import { Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

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
  ...GlobalStyles,

});