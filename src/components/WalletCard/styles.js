// @flow

import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';

const styles = StyleSheet.create({

  container: {
    marginTop: 5,
    height: 130,
    backgroundColor: Colors.Transparent,
    flex: 1,
    alignItems: 'stretch',
  },
  icon: {
    width: 55,
    marginRight: 5,
    marginTop: 36,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderRadius: 15,
    backgroundColor: Colors.white,
  },
  textColumn: {
    flex: 1,
    marginLeft: 0,
    justifyContent: 'flex-start',
  },
  spacer: {
    flex: 1,
  },
  nameHeading: {
    fontSize: 17,
    color: Colors.BitnationGrayColor,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nameSubheading: {
    fontSize: 30,
    color: Colors.BitnationHighlightYellowColor,
  },
  button: {
    height: 36,
    backgroundColor: Colors.Transparent,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftButton: {
    marginRight: 4,
  },
  messageText: {
    color: Colors.BitnationLightColor,
    fontSize: 14,
    marginBottom: 10,
  },
});

export default styles;
