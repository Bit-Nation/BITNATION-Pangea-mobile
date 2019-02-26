// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from 'pangea-common-reactnative/styles';
import Colors from 'pangea-common-reactnative/styles/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  flex: { flex: 1 },
  panelViewTitle: {
    ...GlobalStyles.panelViewTitle,
    color: Colors.BitnationHighlightColor,
  },
});
export default styles;
