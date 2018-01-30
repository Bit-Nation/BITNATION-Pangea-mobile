import React, { Component } from 'react';
import { View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

/**
 * @desc Component is used to add margin on top of the screen.
 * @discussion This component is created to be used together with background image for the whole screen (including status/navigation bar), but content rendered below navigation bar.
 * @todo Create component for global screen margins handling and deprecate this one.
 */
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
  },
});