import { StyleSheet } from 'react-native';

import GlobalStyles from '../../../global/Styles'
import Colors from '../../../global/Colors';

export default styles = StyleSheet.create({
  ...GlobalStyles,
  bodyContainer: {
    marginLeft: 8,
    marginRight: 8,
  },
  codeText: {
    fontSize: 14,
    color: Colors.navButtonTextColor,
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

});