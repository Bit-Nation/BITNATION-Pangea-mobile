import { StyleSheet } from 'react-native';
import { Dimensions, } from 'react-native';
import Colors from '../../../global/Colors';

var { height, width } = Dimensions.get('window');

export default styles = StyleSheet.create({

  header: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: width * .03,
    marginTop: height * .02,
    color: Colors.white,
    backgroundColor: Colors.Transparent,
  },
  mainContainer: {
    flexDirection: 'column',
  },
  panelBox: {
    backgroundColor: Colors.getBitNationBlue(0.2),
    width: width * .9,
    marginLeft: width * .05,
    borderRadius: 10,
    opacity: 1,
    marginTop: height * .03,
  },
  panelHeader: {
    color: Colors.BitnationBlue,
    fontSize: 22,
    textAlign: 'center',
    marginTop: height * .02,
    opacity: 1,
  },
  panelText: {
    marginTop: height * .01,
    textAlign: 'left',
    fontSize: 14,
    color: Colors.BitnationBlue,
    marginLeft: width * .03,
    marginRight: width * .03,
    opacity: 1,
  },
  emailTextBox: {
    width: '90%',
    marginLeft: '5%',
    backgroundColor: 'yellow',
    height: height * .04,
  },
  emailTextInput: {
    fontSize: 20,
    color: Colors.Background,
    height: height * .07,
    width: '90%',
    marginLeft: width * .03,
    opacity: .7,
    marginTop: height * .03,
    backgroundColor: Colors.BlueMed,
    borderRadius: 2,
    paddingLeft: width * .03,
  },
  buttonBoxStyle: {
    width: width * .7,
    height: height * .05,
    marginLeft: '3%',
    opacity: 1,
  },
  buttonStyle: {
    backgroundColor: Colors.buttonColor,
    opacity: 1,
    height: height * .05,
    borderRadius: 16,
    justifyContent: 'center',
    width: width * .6,
  },
  buttonText: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: 16,
    opacity: 1,
    backgroundColor: Colors.Transparent,
  },
  QRCodeContainer: {
    alignItems: 'center',
  },
  QRcode: {
    height: height * .3,
    width: width * .3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    fontSize: 14,
    color: Colors.navButtonTextColor,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
  },

});