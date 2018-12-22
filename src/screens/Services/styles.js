// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  itemSeparator: {
    height: 5,
    width: '100%',
  },
  card: {
    flex: 0.5,
    marginLeft: 10,
  },
  squareCard: {
    marginRight: 10,
  },
});

export default styles;
