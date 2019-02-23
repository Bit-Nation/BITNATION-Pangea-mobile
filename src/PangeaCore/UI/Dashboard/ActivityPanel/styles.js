// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  flex: { flex: 1 },
  panelViewTitle: {
    ...GlobalStyles.panelViewTitle,
    color: Colors.BitnationHighlightColor,
  },
});
export default styles;
