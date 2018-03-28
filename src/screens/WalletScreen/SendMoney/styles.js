// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import Colors from '../../../global/colors';
import GlobalStyles from '../../../global/Styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  textColumn: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  icon: {
    marginLeft: -5,
    width: 35,
    marginRight: 20,
    marginTop: 10,
  },
  textInputContainer: {
    borderColor: GlobalStyles.textInput.borderColor,
    borderBottomWidth: GlobalStyles.textInput.borderBottomWidth,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textInputInContainer: {
    ...GlobalStyles.textInput,
    marginBottom: 0,
    marginTop: 0,
    borderBottomWidth: 0,
  },
  currencyPlaceholder: {
    ...GlobalStyles.currencyLarge,
    color: Colors.placeholderTextColor,
    marginBottom: 6,
  },
  amountLabelText: {
    ...GlobalStyles.footnote,
    marginLeft: 5,
  },
  toLabelText: {
    ...GlobalStyles.footnote,
    marginLeft: 5,
    marginTop: 10,
  },
  toTextInput: {
    ...GlobalStyles.textInput,
    marginTop: 0,
  },
});
export default styles;
