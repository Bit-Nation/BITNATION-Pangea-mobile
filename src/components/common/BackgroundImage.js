import React from 'react';
import { Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import AssetsImages from '../../global/assetsImagesResources';

/**
 * @desc Component that renders common background image. You should use it instead of placing background image on your own.
 * @type React.Component
 */
export default class BackgroundImage extends React.Component {

  render() {
    return (
      <Image style={[styles.background, this.props.style]}
             source={this.props.source || AssetsImages.background}
             resizeMode='cover'
             {...this.props} />
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  }
});