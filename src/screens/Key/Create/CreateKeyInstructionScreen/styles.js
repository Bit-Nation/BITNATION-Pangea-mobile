import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Colors from '../../../../global/colors';
import GlobalStyles from '../../../../global/Styles';

const { height, width } = Dimensions.get('window');

export default styles = StyleSheet.create({
  ...GlobalStyles,
  privateKeyDemoImage: {
    width: width - 30,
    height: (width - 30) / 500 * 386,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});
