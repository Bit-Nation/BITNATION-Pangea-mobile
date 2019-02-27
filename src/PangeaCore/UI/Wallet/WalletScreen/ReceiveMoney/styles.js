// @flow

import { StyleSheet } from 'react-native';

import Colors from 'pangea-common-reactnative/styles/colors';
import GlobalStyles from 'pangea-common-reactnative/styles';

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
