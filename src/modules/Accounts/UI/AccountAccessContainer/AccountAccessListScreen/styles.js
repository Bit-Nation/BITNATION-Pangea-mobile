// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';

import GlobalStyles from '../../../../global/Styles';
import colors from '../../../../global/colors';

const { width } = Dimensions.get('window');

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  /* Example of over-writing a global style sheet value */
  /*
  tabTextStyle: {
    color: Colors.Red,
  },
  */
  buttonListContainer: {
    marginTop: 10,
    marginBottom: 40,
    paddingVertical: 15,
    backgroundColor: colors.BitnationWhiteAlphaColor,
  },
  restoreAccountButton: {
    backgroundColor: colors.Transparent,
    alignSelf: 'center',
    borderColor: colors.white,
    borderBottomWidth: 2,
    width: '80%',
    elevation: 0,
  },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  textStyle: {
    color: colors.BitnationActionColor,
    fontWeight: 'bold',
  },
  restoreAccountButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  newAccountText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  newAccountButton: {
    backgroundColor: colors.Transparent,
    alignSelf: 'center',
    borderColor: '#FF8B00',
    elevation: 0,
  },
});

export default styles;
