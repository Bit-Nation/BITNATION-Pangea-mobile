import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from 'pangea-common-reactnative/styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  textCon: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorGrey: {
    color: '#929497',
  },
  colorYellow: {
    color: '#FF8B00',
  },
});

export default styles;
