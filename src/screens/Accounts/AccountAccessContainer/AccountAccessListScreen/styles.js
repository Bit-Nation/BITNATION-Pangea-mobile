// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';

import GlobalStyles from '../../../../global/Styles';

const { width } = Dimensions.get('window');

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  /* Example of over-writing a global style sheet value */
  /*
  tabTextStyle: {
    color: Colors.Red,
  },
  */
  restoreAccountButton: {
    backgroundColor: '#FF8B00',
    alignSelf: 'center',
    borderColor: '#FF8B00',
    width: 300,
  },
  image: {
    height: 300,
    width,
  },
  restoreAccountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newAccountText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  newAccountButton: {
    backgroundColor: '#FF8B00',
    width: 300,
    alignSelf: 'center',
    borderColor: '#FF8B00',
    marginTop: 15,
  },
});

export default styles;
