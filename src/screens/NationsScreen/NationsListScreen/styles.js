import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  /* Example of over-writing a global style sheet value */
  tabTextStyle: {
    color: Colors.Red,
  },
  
});

export default styles;
