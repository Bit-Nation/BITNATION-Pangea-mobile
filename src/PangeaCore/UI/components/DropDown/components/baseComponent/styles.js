import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  container: {

  },
  accessory: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  triangle: {
    fontSize: 20,
    color: 'gray',
  },
});

export default styles;
