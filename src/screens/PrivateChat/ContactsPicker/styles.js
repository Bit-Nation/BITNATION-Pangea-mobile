// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  chip: {
    paddingRight: 2,
  },
  chipIcon: {
    height: 24,
    width: 24,
  },
  list: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});

export default styles;
