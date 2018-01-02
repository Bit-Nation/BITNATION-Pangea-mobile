import { StyleSheet } from 'react-native';
import { Dimensions, } from 'react-native';
import Colors from '../../../global/Colors';

var { height, width } = Dimensions.get('window');

export default styles = StyleSheet.create({
  backgroundScreen: {
    position: 'absolute',
    height: height,
    width: width,
    zIndex: -1,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: '10%',
    marginLeft: '4.27%',
    opacity: 1,
    paddingBottom: '7.5%',
    backgroundColor: Colors.Transparent,
  },
  cardMain: {
    backgroundColor: '#3d75ad',
    opacity: 0.3,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 5,
    marginTop: height * 0.03,
  },
  discpHeading: {
    fontSize: 24,
    color: '#3d75ad',
    textAlign: 'center',
    opacity: 1,
  },

  discpText: {
    color: '#5881a7',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: '3%',
    marginRight: '3%',
    opacity: 1,
  },

  discpButton: {
    backgroundColor: '#1b4a7a',
    opacity: 1,
    height: height * .05,
    marginBottom: height * .02,
    marginTop: height * 0.01,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  discpButtonText: {
    color: '#fff',
    fontSize: 16,
    opacity: 1,
    paddingLeft: width * .05,
    paddingRight: width * .05,
  },

  flatListStyle: {}

});
  