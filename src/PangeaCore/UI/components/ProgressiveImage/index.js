import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

class ProgressiveImage extends React.Component {
    onImageLoad = () => {
      Animated.timing(this.imageAnimated, {
        toValue: 1,
      }).start();
    }

    imageAnimated = new Animated.Value(0);

    render() {
      const {
        thumbnailSource,
        style,
        imageStyle,
        children,
        ...props
      } = this.props;

      return (
        <View
          accessibilityIgnoresInvertColors
          style={style}
        >
          <Animated.Image
            {...props}
            style={[
                        StyleSheet.absoluteFill,
                        {
                            opacity: this.imageAnimated,
                            width: style.width,
                            height: style.height,
                        },
                        imageStyle,
                    ]}
            onLoad={this.onImageLoad}
          />
          {children}

        </View>
      );
    }
}

export default ProgressiveImage;
