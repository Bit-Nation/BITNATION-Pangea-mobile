// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  itemSeparator: {
    height: 5,
    width: '100%',
  },
});

export default styles;
