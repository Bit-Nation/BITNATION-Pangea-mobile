import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';

const styles = MediaQueryStyleSheet.create({
    logo: {
      alignSelf: 'center',
    },
    background: {
      flex: 1,
      resizeMode: 'stretch',
      width: null,
      height: null,
      position: 'relative',
      backgroundColor: 'black',
    },
    logoContainer: {
      flex: 0.4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: Colors.black,
      position: 'absolute',
      top: '18%',
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }
});

export default styles;
