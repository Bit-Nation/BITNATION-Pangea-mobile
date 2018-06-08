// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  bottomSpacer: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navButtons: {
    alignSelf: 'flex-end',
  },
  WHITE: {
    alignSelf: 'flex-end',
  },

  inlineFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyAccountContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    paddingHorizontal: 20,
  },
  lengthSlider: {
    width: '50%',
  },

  networkDropdownButton: {
    flex: 1,
    marginBottom: 20,
  },

  networkDropdownList: {
    flex: 1,
    marginTop: 10,
  },

  mt30: {
    marginTop: 30,
  },
  accountTitle: {
    marginTop: 40,
    marginBottom: 19,
    backgroundColor: 'white',
    paddingHorizontal: 28,
    color: '#58595B',
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  accountIntroText: { flex: 1 },
  restoreButton: {
    backgroundColor: 'transparent', alignSelf: 'stretch', borderRadius: 0,
  },
  restoreButtonText: { color: '#58595B', fontSize: 15, fontWeight: 'bold' },
  newAccountText: { color: '#FF8B00', fontSize: 15, fontWeight: '900' },
  createButton: {
    height: 54, backgroundColor: 'white', alignSelf: 'stretch', borderRadius: 0,
  },
});

export default styles;
