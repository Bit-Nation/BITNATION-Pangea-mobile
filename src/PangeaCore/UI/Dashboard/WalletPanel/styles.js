// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from 'pangea-common-reactnative/Styles';
import Colors from 'pangea-common-reactnative/styles/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  panelViewTitle: {
    ...GlobalStyles.panelViewTitle,
    color: Colors.BitnationHighlightColor,
  },
  walletGridPanel: {
    ...GlobalStyles.gridPanelView,
    flex: 0,
    justifyContent: 'flex-start',
  },
  textWallet: { fontWeight: 'normal', color: '#FF8B00', fontSize: 30 },
});
export default styles;
