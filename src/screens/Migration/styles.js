// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  migrationContainer: {
    flex: 1,
  },
  migrationText: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
});

export default styles;
