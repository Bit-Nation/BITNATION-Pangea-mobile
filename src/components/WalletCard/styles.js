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
    marginRight: 10,
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
    borderRadius: 14,
    width: 70,
  },
  transactionButton: {
    height: 36,
    marginLeft: 12,
    width: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginLeft: 5,
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
