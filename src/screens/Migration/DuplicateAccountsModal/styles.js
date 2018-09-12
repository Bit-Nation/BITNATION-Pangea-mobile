// @flow

import { Dimensions } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';

const { width, height } = Dimensions.get('window');

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  modalContainer: {
    flex: 1,
    paddingVertical: height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.4)',
  },
  duplicateModal: {
    width: width * 0.9,
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  listAccountView: {
    marginVertical: 10,
  },
  itemView: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: Colors.BitnationLightGrayColor,
  },
  leftItem: {
    flex: 0.2,
  },
  rightItem: {
    flex: 0.8,
  },
  textItem: {
  },
  buttonArea: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  buttonText: { color: '#FF8B00', fontSize: 15, fontWeight: '900' },
});

export default styles;
