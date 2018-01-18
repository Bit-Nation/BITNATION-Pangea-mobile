import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

export default class FakeNavigationBar extends Component {

  render() {
    return (
     <View style={this.props.navBarHidden ? styles.fakeStatusBar : styles.fakeNavigationBar}/>
    );
  }

}

const styles = MediaQueryStyleSheet.create({

  fakeNavigationBar: {
    ...GlobalStyles.navigationBar,
  },

  fakeStatusBar: {
    ...GlobalStyles.statusBar,
  }
});