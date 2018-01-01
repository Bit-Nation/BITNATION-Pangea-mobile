import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import Text from './Text';
import Colors from '../../global/Colors';

export default class _Button extends React.Component {

  render() {
    const { style, children, onPress, ...props } = this.props;

    return (
      <View style={[styles.button, style]} {...props}>
        <TouchableOpacity style={[styles.container]} onPress={onPress}>
          {children || this._renderTitle()}
        </TouchableOpacity>
      </View>
    );
  }

  _renderTitle() {
    return (
      <Text buttonTitle>
        {this.props.title}
      </Text>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  button: {
    borderRadius: 15,
    backgroundColor: Colors.buttonColor,
    height: 30,
    justifyContent: 'center',
  },
  container: {
    marginLeft: 13,
    marginRight: 13,
  }
});