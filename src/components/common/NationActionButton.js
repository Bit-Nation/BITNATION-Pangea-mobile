import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import Colors from '../../global/Colors';
import GlobalStyles from '../../global/Styles';

{/*  *************************
  NationActionButton parameters:
    iconSource = image to render
    title = Title of the Button
    disable = State of the Button
    ****************************  */}

export default class NationActionButton extends Component {

  render() {
    const { style, children, ...props } = this.props;

    return (
      <View style={[styles.tabBarButton, style]} {...props} opacity={this.props.disable ? 0.4 : 1}>
        <TouchableOpacity style={[styles.tabBarContainer]}
                          onPress={this.props.onPress} disabled={this.props.disable}
                          activeOpacity={this.props.disable ? 1 : 0.4}>
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