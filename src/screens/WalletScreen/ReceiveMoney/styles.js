// @flow

import { StyleSheet } from 'react-native';

import Colors from '../../../global/colors';
import GlobalStyles from '../../../global/Styles';

const styles = StyleSheet.create({
  ...GlobalStyles,

  codeText: {
    fontSize: 14,
    color: Colors.navButtonTextColor,
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  addressText: {
    ...GlobalStyles.footnote,
    textAlign: 'center',
  },
});

export default styles;
