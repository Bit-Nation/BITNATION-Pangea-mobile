import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  nameText: {
    fontSize: 28,
    color: Colors.white,
    letterSpacing: -1.13,
    textAlign: 'left',
    backgroundColor: 'transparent'
  },
  infoText: {
    fontSize: 16,
    color: Colors.BitNationLightBlue,
    letterSpacing: -0.65,
    lineHeight: 20.8,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  textInput: {
    backgroundColor: Colors.getBitNationLightBlue(0.2),
    borderColor: Colors.borderColor,
    borderWidth: 1,
    color: Colors.white,
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 16,
    marginLeft: 16,
    fontSize: 16,
    paddingLeft: 4,
    paddingTop: 6,
    paddingBottom: 6,
  },
});

export default styles;