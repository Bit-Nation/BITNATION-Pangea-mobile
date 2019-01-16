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
    color: Colors.BitnationDarkGrayColor,
    fontSize: 40,
    paddingTop: 30,
    paddingBottom: 35,
    height: 180,
    marginTop: 36,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
  pinButton: {
    backgroundColor: '#FF8B00',
    width: 300,
    alignSelf: 'center',
    borderColor: '#FF8B00',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default styles;
