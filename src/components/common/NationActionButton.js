import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import Colors from '../../global/Colors';

export default class NationActionButton extends Component {

  render() {
    const { style, children, ...props } = this.props;

    return (
      <View style={[styles.button, style]} {...props}>
        <TouchableOpacity style={[styles.container]} onPress={this.props.onPress}>
          <Image source={this.props.iconSource}/>
          <Text style={styles.title}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  button: {
    borderRadius: 15,
    backgroundColor: 'transparent',
    height: 48,
    width: 48,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 4,
    color: '#8E8E93',
    backgroundColor: 'transparent',
    fontSize: 10,
  },
});