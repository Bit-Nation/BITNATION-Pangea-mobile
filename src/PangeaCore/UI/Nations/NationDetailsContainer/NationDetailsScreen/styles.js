import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from 'pangea-common-reactnative/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  scrollView: {
    flex: 1,
  },

});

export default styles;
