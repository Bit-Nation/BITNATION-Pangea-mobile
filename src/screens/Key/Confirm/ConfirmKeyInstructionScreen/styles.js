// @flow

import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyles from '../../../../global/Styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  ...GlobalStyles,
  privateKeyDemoImage: {
    width: width - 30,
    height: (width - 30) * (386 / 500),
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
