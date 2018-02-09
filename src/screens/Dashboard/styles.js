import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';

import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';

const { height, width } = Dimensions.get('window');

const styles = MediaQueryStyleSheet.create(
  {
    ...GlobalStyles,
    stackView: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      flex: 1,
      marginLeft: 8,
      marginRight: 8,
    },
    logoContainer: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
    },
    logo: {
      width: '40%',
    }
  });
export default styles;