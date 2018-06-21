// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  /* Example of over-writing a global style sheet value */
  /*
  tabTextStyle: {
    color: Colors.Red,
  },
  */
});

export default styles;
