// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from 'pangea-common-reactnative/styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  avatarChangeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
