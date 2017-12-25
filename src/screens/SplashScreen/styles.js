import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';

const styles = MediaQueryStyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems:'center',
          backgroundColor: Colors.Blue,
        },
        logo: {
          alignSelf:'center',
        },
});

export default styles;
