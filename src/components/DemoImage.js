import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import AssetsImages from '../global/AssetsImages';

export default class DemoImage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={AssetsImages.Placeholder.demo}/>
      </View>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});