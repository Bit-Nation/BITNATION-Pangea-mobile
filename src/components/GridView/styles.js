import { StyleSheet } from 'react-native';
import Colors from '../../global/Colors';

export default styles = StyleSheet.create({

  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  rowMargin: {
    marginTop: 14,
  },
  rowInactive: {
    opacity: 0.1,
  }

});