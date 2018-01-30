import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

export default class Loading extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
      </View>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});