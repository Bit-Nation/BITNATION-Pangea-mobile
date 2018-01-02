import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 30,
    backgroundColor: 'transparent',
    color: Colors.BitNationLightBlue,
    textAlign: 'center',
  },
  buttonsView: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.getBitNationLightBlue(0.1),
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  scrollView: {
    flex: 1,
  },
  messageView: {
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 22,
    backgroundColor: 'transparent',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    backgroundColor: 'transparent',
    color: Colors.BitNationLightBlue,
    textAlign: 'center',
  },
});

export default styles;
