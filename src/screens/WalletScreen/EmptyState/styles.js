import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';

export default styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  card: {
    marginLeft: 8,
    marginRight: 8,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  firstCard: {
    marginBottom: 8,
  },
});
  