// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  /* Example of over-writing a global style sheet value */
  /*
  tabTextStyle: {
    color: Colors.Red,
  },
  */
  restoreAccountButton: {
    backgroundColor: 'transparent', alignSelf: 'stretch', borderRadius: 0,
  },
  restoreAccountButtonText: { color: '#58595B', fontSize: 15, fontWeight: 'bold' },
  newAccountText: { color: '#FF8B00', fontSize: 15, fontWeight: '900' },
  newAccountButton: {
    height: 54, backgroundColor: 'white', alignSelf: 'stretch', borderRadius: 0,
  },
});

export default styles;
