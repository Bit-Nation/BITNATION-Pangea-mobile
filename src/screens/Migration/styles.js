// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  container: {
    flex: 1,
  },
  migrationTitle: {
    marginTop: 40,
    marginBottom: 19,
    backgroundColor: 'white',
    paddingHorizontal: 28,
    color: '#58595B',
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  migrationText: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
});

export default styles;
