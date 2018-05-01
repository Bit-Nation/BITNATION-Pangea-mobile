// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  passCodeLengthItemContainer: {
    ...GlobalStyles.sectionListItemContainer,
    flexDirection: 'column',
    alignItems: 'stretch',
    height: 88,
    flex: 0,
  },
  passCodeLengthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  passCodeLengthNumberText: {
    ...GlobalStyles.listItemText,
    textAlign: 'right',
    marginRight: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  slider: {
    flex: 1,
    marginRight: 16,
  },
});

export default styles;
