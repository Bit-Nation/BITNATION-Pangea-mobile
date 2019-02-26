// @flow

import { StyleSheet } from 'react-native';
import Colors from 'pangea-common-reactnative/styles/colors';

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
    height: 20,
    borderRadius: 40,
    backgroundColor: Colors.Transparent,
  },
  buttonText: {
    color: Colors.BitnationActionColor,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
    marginBottom: 15,
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
