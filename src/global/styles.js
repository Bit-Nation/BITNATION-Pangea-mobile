import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from './Colors';

const styles = {

  /* Lists Layout */
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
  },
  segmentedControlContainerBackground: {
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
    color: Colors.Red,
  },
  activeTabStyle: {
    backgroundColor: Colors.getBitNationLightBlue(0.8),
  },

};

export default styles;
