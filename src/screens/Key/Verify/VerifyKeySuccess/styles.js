import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../../global/Colors';

const styles = MediaQueryStyleSheet.create(
  {
    container: {
      flexDirection: 'column',
      flex: 1,
      paddingTop: 50,

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
      fontSize: 26,
      fontWeight: '400',
      marginLeft: '3%',
      backgroundColor: Colors.Transparent,
    },
    wholeText: {
      margin: '3%',
      marginTop: '16%',
      marginRight: '2%'
    },
    applyBold:{
      fontWeight: 'bold',
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
      marginTop: '80%',
    },
  });
export default styles;
