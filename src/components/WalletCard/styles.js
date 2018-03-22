// @flow

import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';

const styles = StyleSheet.create({

  container: {
    height: 130,
    backgroundColor: Colors.Transparent,
    flex: 1,
    alignItems: 'stretch',
  },
  icon: {
    width: 55,
    marginRight: 10,
    marginTop: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  textColumn: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  spacer: {
    flex: 1,
  },
  nameHeading: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nameSubheading: {
    fontSize: 14,
    color: Colors.BitnationLightColor,
  },
  button: {
    backgroundColor: Colors.shadeOfBitnationLightColor(0.3),
    height: 25,
    borderRadius: 14,
    width: 80,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftButton: {
    marginRight: 8,
  },
  messageText: {
    color: Colors.BitnationLightColor,
    fontSize: 14,
    marginBottom: 10,
  },

});

export default styles;
