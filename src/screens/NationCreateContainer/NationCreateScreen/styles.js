import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';
import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  container: {
    ...GlobalStyles.screenContainer,
  },

  infoText: {
    ...GlobalStyles.body,
  },

});

export default styles;