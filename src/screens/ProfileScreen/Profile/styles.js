import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';
import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  container: {
    ...GlobalStyles.screenContainer,
  },

  infoContainer: {
    paddingBottom: 20,
    paddingTop: 10,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: Colors.shadeOfBitnationColor(0.2),
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  achievementsContainer: {
    marginTop: 8,
    marginBottom: 10,
  },
  placeholder: {
    resizeMode: 'contain',
  },

   nameText: {
    fontSize: 28,
    color: Colors.titleColor,
    letterSpacing: -1.13,
    textAlign: 'center',
    backgroundColor: 'transparent',
     ...GlobalStyles.Title1,

  },

  infoText: {
    fontSize: 16,
    color: Colors.BitnationLightColor,
    letterSpacing: -0.65,
    lineHeight: 20.8,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },

  ethAddress: {
    fontSize: 14,
    color: Colors.BitnationLightColor,
    letterSpacing: -0.65,
    lineHeight: 20.8,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});

export default styles;
