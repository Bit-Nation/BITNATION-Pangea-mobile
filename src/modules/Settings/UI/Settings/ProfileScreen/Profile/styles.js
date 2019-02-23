// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../../global/colors';
import GlobalStyles from '../../../../global/Styles';

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
    ...GlobalStyles.title1,
    color: Colors.BitnationDarkGrayColor,
  },

  infoText: {
    ...GlobalStyles.body,
  },

  ethAddress: {
    ...GlobalStyles.footnote,
  },

  publicKey: {
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default styles;
