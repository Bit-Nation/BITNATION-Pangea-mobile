import { MediaQueryStyleSheet } from 'react-native-responsive';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  sectionList: {
    flex: 1,
  },
  messageView: {
    marginLeft: 8,
    marginRight: 8,
  },
  topSpacer: {
    flex: 3,
  },
  bottomSpacer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
