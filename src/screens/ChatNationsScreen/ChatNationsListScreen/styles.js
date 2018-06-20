// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';

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
});

export default styles;
