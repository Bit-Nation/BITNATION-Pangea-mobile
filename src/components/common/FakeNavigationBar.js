import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import AssetsImages from '../../global/AssetsImages';

export default class FakeNavigationBar extends Component {

  render() {
    return (
      <View style={this.props.navBarHidden ? styles.fakeStatusBar : styles.fakeNavigationBar}/>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  fakeNavigationBar: {
    height: 64,
    backgroundColor: 'transparent',
  },
  fakeStatusBar: {
    height: 20,
    backgroundColor: 'transparent',
  }
});