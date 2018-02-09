import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';

import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/Colors';

const styles = MediaQueryStyleSheet.create(
  {
    ...GlobalStyles,
    flex: { flex: 1 },
    childrenContainer: {
      flex: 1,
      marginLeft: -15,
      marginRight: -15,
    },
    nationsCountContainer: {
      paddingLeft: 15,
      height: 40,
      alignItems: 'flex-start',
    },
    nationsCountNumber: {
      fontSize: 21,
      fontWeight: '800',
      color: Colors.white,
    },
    nationsHeader: {
      backgroundColor: Colors.shadeOf(Colors.BitnationDarkColor, 0.5),
      paddingLeft: 15,
      height: 30,
      justifyContent: 'center',
    },
    nationsHeaderText: {
      ...GlobalStyles.footnote,
      color: Colors.white,
    },
  });
export default styles;