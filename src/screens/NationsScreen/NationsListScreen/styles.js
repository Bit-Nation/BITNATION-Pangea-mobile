import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  sectionList: {
    flex: 1,
  },
  segmentedControlContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(27,57,92,0.50)',
  },
  tabsContainerStyle: {
    backgroundColor: 'transparent',
  },
  tabStyle: {
    backgroundColor: 'transparent',
  },
  tabTextStyle: {
    backgroundColor: 'transparent',
    color: Colors.white,
  },
  activeTabStyle: {
    backgroundColor: Colors.getBitNationLightBlue(0.8),
  },
  fakeNavigationBar: {
    height: 64,
    backgroundColor: 'transparent',
  },
});

export default styles;
