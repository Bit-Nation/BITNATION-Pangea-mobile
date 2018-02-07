import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';

import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create(
  {
    ...GlobalStyles,
    flex: { flex: 1 },
  });
export default styles;