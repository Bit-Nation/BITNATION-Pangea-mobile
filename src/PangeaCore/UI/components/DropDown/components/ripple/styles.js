// @flow

import { StyleSheet } from 'react-native';
import Colors from 'pangea-common-reactnative/styles/colors';

const radius = 10;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.Transparent,
    overflow: 'hidden',
  },

  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
});

export { styles, radius };
