import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  scrollView: {
    flex: 1,
  },

});

export default styles;
