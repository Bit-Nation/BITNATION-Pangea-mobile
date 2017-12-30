import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageView: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: Colors.getBitNationBlue(0.2),
  },
  messageContainer: {
    paddingTop: 12,
    paddingBottom: 22,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  topSpacer: {
    flex: 3,
  },
  bottomSpacer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    marginTop: 5,
  },
  button: {
    marginTop: 13,
  }
});

export default styles;
