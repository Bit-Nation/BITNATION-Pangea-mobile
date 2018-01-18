import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import Colors from '../../global/Colors';
import GlobalStyles from '../../global/Styles';

export default class NationActionButton extends Component {

  render() {
    const { style, children, ...props } = this.props;

    return (
      <View style={[styles.tabBarButton, style]} {...props}>
        <TouchableOpacity style={[styles.tabBarContainer]} onPress={this.props.onPress}>
          <Image source={this.props.iconSource}/>
          <Text style={styles.tabBarTitle}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

});