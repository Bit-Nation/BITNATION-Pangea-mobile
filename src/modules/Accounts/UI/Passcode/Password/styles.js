// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  submitButton: {
    width: 80,
    marginTop: 40,
    alignSelf: 'center',
  },
  textInput: {
    color: Colors.BitnationGrayColor,
    fontSize: 16,
    paddingTop: 2,
    paddingBottom: 2,
    height: 50,
    marginTop: 16,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
});

export default styles;
