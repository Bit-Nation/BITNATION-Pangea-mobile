import { StyleSheet } from 'react-native';

import GlobalStyles from '../../../../global/Styles';

export default styles = StyleSheet.create({
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

});