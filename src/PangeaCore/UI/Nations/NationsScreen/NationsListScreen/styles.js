// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from 'pangea-common-reactnative/styles/colors';
import GlobalStyles from 'pangea-common-reactnative/styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  itemSeparator: {
    height: 5,
    width: '100%',
  },
  card: {
    flex: 0.5,
  },
  headerBackground: {
    backgroundColor: Colors.BitnationLightGrayColor,
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
});

export default styles;
