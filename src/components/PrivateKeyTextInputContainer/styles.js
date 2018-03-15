// @flow

import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';

export const cursorColor = Colors.BitnationLightColor;

const styles = StyleSheet.create({
  container: {
    height: 44,
    flex: 1,
  },
  textInput: {
    backgroundColor: Colors.white,
    color: Colors.BitnationLightColor,
    fontSize: 16,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    height: 24,
  },
  text: {
    color: Colors.privateKeyTextInputLabelColor,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default styles;
