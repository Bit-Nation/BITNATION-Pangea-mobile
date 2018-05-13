// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  buttonContainer: {
    ...GlobalStyles.buttonContainer,
    marginBottom: 16,
  },
});

export default styles;
