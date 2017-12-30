import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  infoContainer: {
    paddingBottom: 20,
    paddingTop: 10,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: Colors.getBitNationBlue(0.2),
    alignItems: 'center',
  },
  holonsContainer: {
    marginTop: 20,
  },
  achievementsContainer: {
    marginTop: 8,
    marginBottom: 10,
  },
  placeholder: {
    resizeMode: 'contain',
  }
});

export default styles;
