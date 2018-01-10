import { MediaQueryStyleSheet } from 'react-native-responsive';

const styles = MediaQueryStyleSheet.create(
  {
    container: {
      flexDirection: 'column',
      flex: 1,
    },
    wholeText: {
      margin: '3%',
      marginTop: '8%',
      marginRight: '2%',
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
