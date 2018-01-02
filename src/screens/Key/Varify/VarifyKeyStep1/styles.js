import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions, } from 'react-native';
import Colors from '../../../../global/Colors';

var { height, width } = Dimensions.get('window');
const styles = MediaQueryStyleSheet.create(
  {
    container: {
      flexDirection: 'column',
      flex: 1,
    },
    backgroundImage: {
      width: '100%',
      position: 'absolute',
    },

    header: {
      backgroundColor: Colors.Transparent,
    },
    cancel: {
      color: Colors.Blue
    },
    next: {
      color: Colors.Blue,
    },
    title: {
      color: Colors.Background,
      fontSize: 30,
      fontWeight: 'bold',
      marginLeft: '3%',
      backgroundColor: Colors.Transparent,
    },
    wholeText: {
      margin: '3%',
      marginTop: '8%',
      marginRight: '2%'
    },
    description: {
      color: Colors.Blue,
      fontSize: 16,
      marginBottom: '6%',
      backgroundColor: Colors.Transparent,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '55%',
    },

  });
export default styles;
