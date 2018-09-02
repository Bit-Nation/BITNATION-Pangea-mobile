// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  previewContainer: {
    padding: 16,
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  metadataContainer: {
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default styles;
