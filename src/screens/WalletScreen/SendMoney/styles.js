import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';
import Colors from '../../../global/Colors';

const styles = MediaQueryStyleSheet.create(
  {
    container: {
      flexDirection: 'column',
      flex: 1,
    },
    scrollView: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      height: 555,
    },
    scrollViewContentContainer: {
      flex: 1,
    },
    baseTextInput: {
      flex: 1,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: Colors.getBitNationLightBlue(0.2),
    },

    //1st
    sendMoneyContainer: {
      flex: 1.2,
      backgroundColor: Colors.Transparent,
    },
    sendMoneyText: {
      height: 41,
      width: 174,
      color: '#FFFFFF',
      //  fontFamily:"SF Pro Display",
      fontSize: 30,
      fontWeight: 'bold',
      lineHeight: 41,
    },

    //2nd
    fromContainer: {
      // flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      //backgroundColor:'red',
      backgroundColor: Colors.Transparent,
    },
    fromTextContainer: {
      width: '24%',
      backgroundColor: Colors.Transparent,
    },
    fromText: {
      height: 20,
      width: 40,
      color: '#4A90E2',
      //    fontFamily: "SF Pro Display",
      fontSize: 17,
      lineHeight: 20,
      marginRight: '5%'
    },
    ethereumContainer: {
      flex: 5,
      flexDirection: 'row',
      height: 68,
      //width: 271,
      backgroundColor: '#1B395C',
    },
    ethereumLogoContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.Transparent,
      justifyContent: 'center',
      marginLeft: '4%'
    },
    ethereumLogo: {
      position: 'absolute',
      zIndex: -1,
      height: 80,
      width: 50,
    },
    ethereumDetailsContainer: {
      flex: 6,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: Colors.Transparent,
      marginLeft: 20,
    },
    ethereumTextContainer: {
      height: 20,
      color: '#FFFFFF',
      backgroundColor: Colors.Transparent,
      fontSize: 17,
      lineHeight: 20,
      marginBottom: '1%',
      textAlign: 'left',
    },
    ethereumNumberContainer: {
      height: 16,
      color: '#72A4DE',
      backgroundColor: Colors.Transparent,
      fontSize: 14,
      lineHeight: 16,
      textAlign: 'left',
    },

    //3rd
    amountContainer: {
      // flex: 1.4,
      flexDirection: 'row',
      backgroundColor: Colors.Transparent,
      marginTop: 20,
      height: 32,
    },
    amountTextContainer: {
      width: '24%',
      backgroundColor: Colors.Transparent,
    },
    amountText: {
      color: '#4A90E2',
      //    fontFamily: "SF Pro Display",
      fontSize: 17,
      //lineHeight: 20,
      marginRight: '8%'
    },
    amountBoxContainer: {
      flex: 2.2,
      borderWidth: 1,
      backgroundColor: Colors.Transparent,
      borderColor: Colors.borderColor,
      justifyContent: 'center',
    },
    amountTextInput: {
      color: '#FFFFFF',
      fontSize: 16,
      lineHeight: 10,
      textAlign: 'right',
    },
    amountCurrencyContainer: {
      marginRight: 8,
      backgroundColor: Colors.Transparent,
      justifyContent: 'center',
    },
    amountCurrency: {
      color: '#4A90E2',
      //    fontFamily: "SF Pro Display",
      fontSize: 17,
      marginLeft: 17,
    },

    //4th
    toContainer: {
      // flex: 1.4,
      flexDirection: 'row',
      marginTop: 20,
      backgroundColor: Colors.Transparent,
      height: 32,
    },
    toTextContainer: {
      width: '24%',
      backgroundColor: Colors.Transparent,
    },
    toText: {
      color: '#4A90E2',
      //    fontFamily: "SF Pro Display",
      fontSize: 17,
      //lineHeight: 20,
      marginRight: '8%',
    },
    ethAddressBoxContainer: {
      flex: 4.35,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      backgroundColor: Colors.Transparent,
      justifyContent: 'center'
    },
    ethTextInput: {
      color: '#FFFFFF',
      //  fontFamily: "SF Pro Text",
      fontSize: 16,
    },
    qrCodeContainer: {
      flex: 0.7,
      marginLeft: 5,
      backgroundColor: Colors.Transparent,
      alignSelf: 'center',
    },
    qrLogo: {
      width: 38,
      height: 38,
      borderRadius: 8
    },

    //5th
    noteContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 20,
      backgroundColor: Colors.Transparent,
    },
    noteTextContainer: {
      width: '24%',
      backgroundColor: Colors.Transparent,
    },
    noteText: {
      color: '#4A90E2',
      //    fontFamily: "SF Pro Display",
      fontSize: 17,
      marginRight: '6%'
    },
    noteBoxContainer: {
      flex: 7,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      justifyContent: 'flex-start',
      backgroundColor: Colors.Transparent,
    },
    descriptionTextInput: {
      color: 'white',
      fontSize: 16,
    },

    //6th
    calculatedEmptyContainer: {
      // flex: 3,
      flexDirection: 'row',
      marginTop: 20,
      backgroundColor: Colors.Transparent,
    },
    empty: {
      width: '24%',
    },
    calculatedContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      backgroundColor: 'rgba(27,57,92,0.5)',
      paddingLeft: 8,
      paddingRight: 8,
      justifyContent: 'space-around',
      height: 81,
    },
    calculatedText: {
      height: 20,
      color: '#007AFF',
      fontSize: 17,
      lineHeight: 20,
    },
    sendAmountContainer: {
      flexDirection: 'row',

    },
    feeContainer: {
      flexDirection: 'row',
    },

    //7th
    sendContainer: {
      marginTop: 20,
      marginBottom: 20,
      // flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButton: {
      width: 130,
    },

  });
export default styles;
