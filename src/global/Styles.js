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

  // e.g. NationListHeader
  sectionListHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LightGrey,
    opacity: 0.5,
  },

  sectionListHeaderText: {
    flex: 1,
    marginLeft: 15,
    color: '#6D6D72',
    fontSize: 13,
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


  // ========================================
  // Tab Bar with icons
  // e.g. NationActionButton used on NationDetailsScreen/index.js
  tabBarButton: {
    borderRadius: 15,
    backgroundColor: 'transparent',
    height: 48,
    width: 48,
    justifyContent: 'center',
  },
  tabBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarTitle: {
    marginTop: 4,
    color: '#8E8E93',
    backgroundColor: 'transparent',
    fontSize: 10,
  },


  // ========================================
  // Basic Text Styles, e.g. components/common/Text.js

  messageTitle: {
    fontSize: 22,
    color: Colors.titleColor,
    letterSpacing: -0.89,
    lineHeight: 28,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: Colors.BitNationLightBlue,
    letterSpacing: -0.65,
    lineHeight: 20.8,
    textAlign: 'center',
  },
  buttonTitle: {
    fontSize: 14,
    color: Colors.BitNationLightBlue,
    letterSpacing: -0.02,
    lineHeight: 19,
    textAlign: 'center',
  },
  disabledButtonTitle: {
    fontSize: 14,
    color: Colors.disabledButtonTitleColor,
    letterSpacing: -0.02,
    lineHeight: 19,
    textAlign: 'center',
  },

  // ========================================
  // Buttons
  // e.g. components/common/Button.js

  baseButton: {
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
  },

  enabledButton: {
    backgroundColor: Colors.buttonColor,
  },

  disabledButton: {
    backgroundColor: Colors.disabledButtonColor,
  },

  buttonContainer: {
    marginLeft: 13,
    marginRight: 13,
  },


  // ========================================
  // Messages
  // e.g. components/common/MessageView.js


};

export default styles;
