import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';

import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';

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
});
export default styles;
