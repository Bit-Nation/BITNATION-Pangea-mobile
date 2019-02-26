// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from 'pangea-common-reactnative/styles';
import Colors from 'pangea-common-reactnative/styles/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  bodyContainer: {
    flex: 1,
  },
  itemSeparator: {
    height: 5,
    width: '100%',
  },
  card: {
    flex: 0.5,
    marginLeft: 10,
  },
  squareCard: {
    marginRight: 10,
  },
  searchBarContainer: {
    backgroundColor: Colors.BitnationLinkOrangeColor,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconStyle: {
    width: 25,
    height: 25,
  },
  textInputStyle: {
    width: '85%',
    color: Colors.BitnationLinkOrangeColor,
  },
  inputViewContainer: {
    height: '70%',
    width: '95%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabBarUnderlineStyle: {
    backgroundColor: Colors.BitnationLinkOrangeColor,
    height: 2,
    borderRadius: 3,
    marginBottom: 5,
  },
  tabBarTextStyle: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  subTabBarTextStyle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  subTabBarContainerStyle: {
    height: 30,
  },
  subTabBarUnderlineStyle: {
    backgroundColor: Colors.BitnationLinkOrangeColor,
    height: 1.5,
    borderRadius: 2,
    marginBottom: 2,
  },
});

export default styles;
