import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  segmentedControlContainer: {
    ...GlobalStyles.segmentedControlContainer,
    height: 44,
  },
});

export default styles;
