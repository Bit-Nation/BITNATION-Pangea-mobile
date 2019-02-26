// @flow

import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from 'pangea-common-reactnative/Styles';
import Colors from 'pangea-common-reactnative/Styles/colors';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  previewContainer: {
    flex: 1,
    padding: 16,
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
    backgroundColor: Colors.white,
  },
});

export default styles;
