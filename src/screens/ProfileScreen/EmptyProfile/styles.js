import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageView: {
    marginLeft: 8,
    marginRight: 8,
  },
  topSpacer: {
    flex: 3,
  },
  bottomSpacer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
