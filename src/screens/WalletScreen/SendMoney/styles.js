import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Dimensions } from 'react-native';
import Colors from '../../../global/colors';
import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create(
  {
    ...GlobalStyles,

    baseTextInput: {
      flex: 1,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: Colors.shadeOfBitnationLightColor(0.2),
    },

    //1st
    sendMoneyContainer: {
      flex: 1.2,
      backgroundColor: Colors.Transparent,
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
      marginLeft: '4%',
    },
    ethereumLogo: {
      position: 'absolute',
      zIndex: -1,
      height: 48,
      width: 24,
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
      marginLeft: 8,
      marginRight: 8,
      backgroundColor: Colors.Transparent,
      justifyContent: 'center',
    },

    //4th
    toContainer: {
      // flex: 1.4,
      flexDirection: 'row',
      marginTop: 20,
      backgroundColor: Colors.Transparent,
      height: 32,
      marginBottom: 20,
    },
    toTextContainer: {
      width: '24%',
      backgroundColor: Colors.Transparent,
    },
    ethAddressBoxContainer: {
      flex: 4.35,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      backgroundColor: Colors.Transparent,
      justifyContent: 'center',
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
      borderRadius: 8,
    },

  });
export default styles;
