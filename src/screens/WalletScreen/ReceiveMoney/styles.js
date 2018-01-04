import { StyleSheet } from 'react-native';
import Colors from '../../../global/Colors';

export default styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },
  scrollViewContentContainer: {},
  messageView: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    flex: 1,
  },
  QRCodeContainer: {
    marginTop: 8,
    alignItems: 'stretch',
  },
  QRcode: {
    aspectRatio: 1,
  },
  codeText: {
    fontSize: 14,
    color: Colors.navButtonTextColor,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
  },

});