import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';

import Colors from '../../global/Colors';
import GlobalStyles from '../../global/Styles';

const { height, width } = Dimensions.get('window');

const styles = MediaQueryStyleSheet.create(
  {
    ...GlobalStyles,

    scrollContainer: {
      backgroundColor: Colors.Transparent,
    },

    containerList: {
      flex: 1,
      flexDirection: 'row',
    },
    listName: {
      marginRight: '10%',
      width: '80%',
      justifyContent: 'center',
    },
    text: {
      ...GlobalStyles.body,
      marginLeft: '3%',
      marginTop: '3%',
      marginBottom: '4%',
    },

    listItemIconContainer: {
      justifyContent: 'flex-start',
    },
    listItemIcon: {
      height: 10,
      width: 10,
      borderRadius: 20,
    },

    container: {
      flexDirection: 'column',
      flex: 1,
    },
    backImage: {
      position: 'absolute',
      zIndex: -1,
    },
    firstContainer:
      {
        flex: 2,
        flexDirection: 'row',
        marginBottom: 8,
        marginRight: 8,
        marginLeft: 8,
      },


    //Nation, Wallet
    NWContainer:
      {
        flex: 3,
        flexDirection: 'column',
        marginRight: 8,
      },
    NationsContainer: {
      backgroundColor: Colors.shadeOfBitnationColor(0.7),
      borderRadius: 8,
      marginBottom: 8,
    },


    WalletContainer: {
      backgroundColor: Colors.shadeOfBitnationColor(0.6),
      borderRadius: 8,
    },

    ActivityContainer: {
      flex: 4,
      backgroundColor: Colors.shadeOfBitnationColor(0.7),
      borderRadius: 8,
    },

    chatTextContainer:
      {
        flex: 1,
        backgroundColor: Colors.Transparent,
      },
    chatsText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '1%',
    },

    listContainer: {
      flex: 3,
    },
    ChatNationContainer: {
      flex: 1,
      flexDirection: 'row',
    },

    chatContainer: {
      flex: 1.5,
      backgroundColor: Colors.shadeOfBitnationColor(0.5),
      borderRadius: 8,
      marginLeft: '2%',
      marginRight: '2%',
      marginBottom: '2%',
    },

    logoW: {
      backgroundColor: 'red',
      width: '100%',
      height: '90%',
      zIndex: 20,
      position: 'absolute',

    },

    contractsContainer: {
      flex: 1,
      backgroundColor: Colors.shadeOfBitnationColor(0.5),
      borderRadius: 8,
      marginRight: '2%',
      marginBottom: '2%',

    },


    secondContainer: {
      flex: 1,
      backgroundColor: Colors.shadeOfBitnationColor(0.7),
      borderRadius: 8,
      paddingRight: '4%',
      paddingLeft: '4%',
      paddingTop: '3%',
      flexDirection: 'column',
      marginLeft: '2%',
      marginRight: '2%',
    },

    secondText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
    },
    sImage: {

      alignItems: 'center',
      height: height * 0.20,
      width: width * 0.90,

    },
    secondImageContainer: {
      height: height * 0.18,
      width: width * .30,

    },

  });
export default styles;