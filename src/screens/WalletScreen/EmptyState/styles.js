import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

export default styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginLeft: 8,
    marginRight: 8,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  firstCard: {
    marginBottom: 8,
  },
});
  