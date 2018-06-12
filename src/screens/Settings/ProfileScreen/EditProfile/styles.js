// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  avatarChangeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
