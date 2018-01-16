import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from './Colors';

const styles = {

  // ========================================
  // Lists Layout
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  sectionList: {
    flex: 1,
  },

  // e.g. NationListItem Text
  listItemText: {
    color: 'white',
    flex: 1,
    marginLeft: 15,
  },

  // e.g. NationListItem
  sectionListTouchable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

    // e.g. NationListItem
  sectionListItemContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },


  // ========================================
  // Tab Bar with text
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
    color: Colors.white,
  },
  activeTabStyle: {
    backgroundColor: Colors.getBitNationLightBlue(0.8),
  },



};

export default styles;
