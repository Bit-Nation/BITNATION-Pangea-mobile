import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../../global/Colors';

const styles = MediaQueryStyleSheet.create(
  {
    container: {
      flexDirection: 'column',
      flex: 1,
    },
    wholeText: {
      margin: '3%',
      marginTop: '16%',
      marginRight: '2%'
    },
    applyBold: {
      fontWeight: 'bold',
    },
    description: {
      textAlign: 'left',
      marginBottom: '6%',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginBottom: 40,
    },
  }
);

export default styles;
