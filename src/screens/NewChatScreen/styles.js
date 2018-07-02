// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';
import Colors from '../../global/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  submitButton: {
    width: 80,
    marginTop: 40,
    alignSelf: 'center',
  },
  textInput: {
    color: Colors.white,
  },
  buttonContainer: {
    marginTop: 50,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatActionButton: {
    color: Colors.white,
    width: 260,
    height: 50,
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default styles;
