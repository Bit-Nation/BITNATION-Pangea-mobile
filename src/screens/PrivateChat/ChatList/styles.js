// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import { StyleSheet, Platform } from 'react-native';
import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';
import { PADDING_STATUS_BAR_IOS } from '../../../global/Constants';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  /* Example of over-writing a global style sheet value */
  /*
  tabTextStyle: {
    color: Colors.Red,
  },
  */
  fabStyle: {
    backgroundColor: '#FF8B00',
  },

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.4)',
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

  profileArea: {

  },

  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalMoreContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 100,
    paddingRight: 10,
    paddingTop: Platform.OS === 'android' ? 0 : PADDING_STATUS_BAR_IOS,
  },
  modalMoreContent: {
    backgroundColor: 'white',
    shadowColor: Colors.BitnationDarkGrayColor,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    elevation: 2,
  },
  modalMenuItem: {
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalMenuItemBorderBottom: {
    borderBottomColor: Colors.BitnationBlackAlphaColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalMenuText: {
    paddingLeft: 15,
    fontSize: 16,
    color: Colors.BitnationBlackAlphaColor,
  },
  iconForward: {
    fontSize: 17,
    color: Colors.BitnationBlackAlphaColor,
    paddingTop: 5,
    paddingLeft: 60,
    paddingRight: 15,
  },
});

export default styles;
