// @flow

import React from 'react';
import { View, ImageBackground } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import AssetsImages from '../../global/AssetsImages';

type Props = {
  /**
   * @desc Custom color view over background
   */
  maskColor?: any,
  /**
   * @desc Custom style to apply to component on top of default.
   */
  style?: any,
  /**
   * @desc Source of image to be shown instead of default background.
   */
  source?: number,
};

/**
 * @desc Component that renders common background image.
 * You should use it instead of placing background image on your own.
 * @return {React.Component} A component.
 */
const BackgroundImage = ({
  style, source, maskColor, ...props
}: Props) => {
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
    },
    maskColor: {
      width: '100%',
      height: '100%',
      backgroundColor: maskColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <ImageBackground
      style={[styles.background, style]}
      source={source}
      resizeMode='cover'
      {...props}
    >
      {
        maskColor ?
          <View style={styles.maskColor} /> : null
      }
    </ImageBackground>);
};

BackgroundImage.defaultProps = {
  style: undefined,
  source: AssetsImages.background,
};

export default BackgroundImage;
