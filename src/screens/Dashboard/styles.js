import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';

import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';

const { height, width } = Dimensions.get('window');

const styles = MediaQueryStyleSheet.create(
  {
    ...GlobalStyles,

    activityPanelContainer: {
      flex: 1,
    },
    activityPanel: {
      flex: 1,
    },
    bottomContainer: {
      flex: 2,
      flexDirection: 'row',
    },
    nationsPanel: {
      flex: 1,
        marginRight:4,
    },
    rightContainer: {
      marginLeft: 4,
      flex: 1,
    },
    walletPanel: {},
    warningPanel: {
      flex: 1,
    },
  });
export default styles;