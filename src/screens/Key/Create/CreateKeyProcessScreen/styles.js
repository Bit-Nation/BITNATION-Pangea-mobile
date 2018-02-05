import { StyleSheet } from 'react-native';

import Colors from '../../../../global/Colors';
import GlobalStyles from '../../../../global/Styles';

export default styles = StyleSheet.create({
  ...GlobalStyles,
  gridView: {
    flex: 1,
  },
  gridContainer: {
    height: 241,
    borderRadius: 8,
    backgroundColor: Colors.shadeOf(Colors.BitnationDarkColor, 0.7),
    paddingTop: 20,
    paddingBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '12%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    width: 90,
  },

});
