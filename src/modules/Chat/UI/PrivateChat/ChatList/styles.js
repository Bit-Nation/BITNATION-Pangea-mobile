// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from 'pangea-common-reactnative/styles';
import Colors from 'pangea-common-reactnative/styles/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.4)',
  },
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
  modalContent: {
    width: 327,
    backgroundColor: 'white',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  newChatModal: {
    height: 471,
  },

  invalidKeyModal: {
    height: 393,
  },

  inviteSuccessModal: {
    height: 248,
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },

  modalBody: {
    marginTop: 17,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.54)',
  },

  userName: {
    fontSize: 28,
    color: Colors.BitnationDarkGrayColor,
    marginTop: 13,
  },

  profileArea: {},

  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalMoreContainer: {
    flex: 1,
    backgroundColor: Colors.lightFade,
    paddingLeft: 100,
    paddingRight: 8,
    paddingTop: GlobalStyles.statusBar.height + 8,
  },
  modalMoreContent: {
    backgroundColor: 'white',
  },
  modalMenuItem: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalMenuText: {
    paddingLeft: 15,
    fontSize: 16,
    color: Colors.BitnationBlackAlphaColor,
  },
  sectionList: { flex: 1 },
  iconForward: {
    fontSize: 17,
    color: Colors.BitnationBlackAlphaColor,
    paddingTop: 5,
    paddingLeft: 4,
    paddingRight: 15,
  },
});

export default styles;
