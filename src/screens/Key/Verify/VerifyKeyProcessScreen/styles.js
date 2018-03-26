// @flow

import { StyleSheet } from 'react-native';

import GlobalStyles from '../../../../global/Styles';

const styles = StyleSheet.create({
  ...GlobalStyles,
  gridView: {
    flex: 1,
  },
  gridContainer: {
    ...GlobalStyles.privateKeyGridViewContainer,
  },
  buttonContainer: {
    ...GlobalStyles.buttonContainerMultiple,
    marginTop: 15,
  },
  button: {
    width: 90,
  },
  textInput: {
    marginLeft: 10,
  },
  firstTextInput: {
    marginLeft: 0,
  },
});

export default styles;
