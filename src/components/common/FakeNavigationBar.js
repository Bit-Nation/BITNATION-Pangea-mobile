// @flow

import React from 'react';
import { View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

type Props = {
  navBarHidden?: boolean,
}

/**
 * @desc Component is used to add margin on top of the screen.
 * @discussion This component is created to be used together with background image for
 * the whole screen (including status/navigation bar), but content rendered below navigation bar.
 * @todo Create component for global screen margins handling and deprecate this one.
 * @return {React.Component} A component.
 */
const FakeNavigationBar = ({ navBarHidden }: Props) => {
  const styles = MediaQueryStyleSheet.create({
    fakeNavigationBar: {
      ...GlobalStyles.navigationBar,
    },
    fakeStatusBar: {
      ...GlobalStyles.statusBar,
    },
  });
  return (
    <View style={navBarHidden ? styles.fakeStatusBar : styles.fakeNavigationBar} />
  );
};

FakeNavigationBar.defaultProps = {
  navBarHidden: false,
};

export default FakeNavigationBar;
