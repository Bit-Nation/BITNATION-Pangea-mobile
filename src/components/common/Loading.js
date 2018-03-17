// @flow

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

/**
 * @desc Component to render loading indicator on top of a container.
 * @return {React.Component} A component.
 */
const Loading = () => {
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

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default Loading;
