// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';
import { Col } from 'native-base';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  screenContainer: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  itemViewStyle: {
    paddingVertical: 15,
    borderRadius: 0,
    justifyContent: 'center',
    borderBottomColor: Colors.BitnationLightGrayColor,
    borderBottomWidth: 1,
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 12,
    right: 0,
  },
  rightViewSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 7,
    right: 0,
    width: 100,
    height: 36,
    backgroundColor: Colors.BitnationLightGrayColor,
    borderRadius: 8,
  },
  itemGoldView: {
    width: 20,
    height: 20,
    backgroundColor: Colors.BitnationLightGrayColor,
    borderRadius: 8,
    marginHorizontal: 1,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'center',
  },
  controlButton: {
    borderRadius: 40,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.chatColor,
  },
  controlButtonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
  },
  itemStyle: {
    flexDirection: 'row',
  },
  itemIcon: {
    fontSize: 25,
    color: Colors.BitnationDarkGrayColor,
    paddingRight: 20,
  },
  itemText: {
    fontSize: 16,
    color: Colors.BitnationDarkGrayColor,
  },
  buttonContainer: {
    ...GlobalStyles.buttonContainer,
    marginBottom: 16,
  },
});

export default styles;
