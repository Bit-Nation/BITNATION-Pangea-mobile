import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';

export default styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  bodyContainer: {
    ...GlobalStyles.bodyContainer,
    flex: 0,
    marginLeft: 8,
    marginRight: 8,
  },
});
  