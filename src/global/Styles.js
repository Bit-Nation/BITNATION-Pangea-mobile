/*
========================================

	GLOBAL STYLES

========================================
 */



import { MediaQueryStyleSheet } from 'react-native-responsive'
import Colors from './colors'
import { normalizer, normalWidthMargin, isiPhoneXStatusBar, isiPhoneXTabBar } from '../utils/normalizer'

// ========================================
// DEFAULT TEXT STYLES
// ========================================

import defaultTextStyles from './styles/defaultTextStyles'

// ========================================
// MAIN STYLES
// ========================================

const styles = {
	
	// Use the default text styles
	...defaultTextStyles,
	
	// ========================================
	// Common Layout Elements
	
	// Easy style reference to turn off flex, for objects that should
	// keep their normal size.
	noflex: {
		flex: 0,
	},

	
	// General screen container for ALL elements
	// Derived from Apple Human Interface Guidelines
	// and https://ivomynttinen.com/blog/ios-design-guidelines
	
	screenContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	
	// Container for the main area, below navigation but above the bottom tab bar (if existing)
	// Used for wallet, nation create, etc.
	// This container requires the contents to add additional left/right margins!
	bodyContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		//alignItems: 'stretch',
		alignContent: 'flex-start',
		// these narrow left/right margins are for panels, which have their own indents.
		marginLeft: 8,
		marginRight: 8,
	},
	
	// Container for a grid of panels (or a mosaic).
	// Similar to bodyContainer but we stretch fill all space
	// Used for dashboard
	gridContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		alignContent: 'flex-start',
		flex: 1,
		// these narrow left/right margins are for panels, which have their own indents.
		marginLeft: 8,
		marginRight: 8,
	},
	
	// ScrollView default container style
	scrollView: {
		flex: 1,
	},
	
	// Extra space for the top of a page of text, to distinguish from nav.
	bodyTopSpacer: {
		height: normalizer(18),
	},
	
	// Contains a title for a screen, e.g. Nations or Wallet
	// Margins position correctly INSIDE a bodyContainer View
	titleContainer: {
		marginLeft: 8,
		marginRight: 8,

		// borderWidth:1,
		// borderColor:'red',
	},
	
	// A block of text in the body area
	bodyParagraph: {
		paddingBottom: 16,
	},
	
	statusBar: {
		height: isiPhoneXStatusBar(20),
		backgroundColor: 'transparent',
	},
	
	statusBariPhoneX: {
		height: 44,
		backgroundColor: 'transparent',
	},
	
	// Navigation area that shows a normal ("largeTitle" style) title
	navigationBar: {
		marginTop: isiPhoneXStatusBar(20), // force below the status bar !!! THIS IS WRONG
		marginLeft: 8,
		marginRight: 8,
		height: 44,
		backgroundColor: 'transparent',
	},
	
	// Tab bar at the bottom of the screen
	tabBar: {
		height: 49,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: Colors.shadeOfBitnationLightColor(0.1),
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-around',
	},
	
	// iPhone X? Not sure what this is.
	homeIndicator: {
		height: 34,
	},
	
	// Put the large title inside the body of the screen, so it scrolls up and away.
	// The margins are set in the body container. If the body has no margins (bars that go edge to edge)
	// then use the style below.
	titleBarLarge: {
		height: normalizer(52),
		alignItems: 'flex-start',
		// marginLeft: 8,
		// marginRight: 8,
	},

  titleBarLargeNationDetail: {
    height: normalizer(92),
    alignItems: 'flex-start',
  },
	
	// Used as part of the body of a screen, but if the body area goes to the edges
	// (e.g. a scrolling body with a table) you  might need margins.
	titleBarLargeMargins: {
		height: 52,
		marginLeft: 16,
		marginRight: 16,
		textAlign: 'left',
	},
	
	// Variations:
	
	// From Profile Screen:
	profilesScreenContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		flexDirection: 'column',
		alignItems: 'stretch',
	},
	
	// From Nations Screen:
	nationsScreenContainer: {
		flex: 1,
		//justifyContent: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'column',
		alignItems: 'stretch',
	},

	// From Create Nations Screen:
	nationsScreenImageContainer: {
		flex: 1,
		justifyContent: 'center',
		//justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'stretch',
		marginTop: 30,
		marginBottom: 20,
	},
	
	// ========================================
	// Panels in a grid.
	// These are lists of rectangular panels which contain different kinds of content.
	// Fill the panel with flex views and the alignItems: stretch will make sure they fill it up.
	// Example: screens/dashboard/NationsPanel/index.js
	
	gridPanelView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		margin: 4,
		borderRadius: 8,
		backgroundColor: Colors.panelView,
		overflow: 'hidden',
		// INDENTS
		padding: normalizer(16),
	},
	
	// Make an element inside a gridPanelView (e.g. style=listContainer) flush left/right by
	// removing the LR margin indents
	// Use on a View inside a gridPanelView.
	removeGridPanelMarginsLR: {
		marginLeft: normalizer(-16),
		marginRight: normalizer(-16),
	},
	
	// ========================================
	// Panels in a vertical list.
	// These are lists of rectangular panels which contain different kinds of content.
	// These don't have margin left/right, so they won't work for dashboard.
	// Used in:  components/common/PanelView.js

	panelView: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderRadius: 8,
		backgroundColor: Colors.panelView,
		marginTop: 4,
		marginBottom: 4,
		marginLeft: 0,
		marginRight: 0,
		overflow: 'hidden',
		// INDENTS:
		// paddingLeft: 8,
		// paddingRight: 8,
		// paddingTop: 4,
		// paddingBottom: 4,
		
		padding: normalizer(16),
		
		// borderWidth:5,
		// borderColor:'yellow',
	},
	
	panelViewTransparent: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderRadius: 8,
		backgroundColor: 'transparent',
		marginTop: 8,
		marginBottom: 8,
		marginLeft: 0,
		marginRight: 0,
		//overflow: 'hidden',
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 4,
		paddingBottom: 4,
		
		// borderWidth:1,
		// borderColor:'green',
	},
	
	// Panel Title Container for the Title and Icon, below
	panelTitleRowContainer: {
	   flexDirection: 'row',
	    backgroundColor: 'transparent',
	    paddingBottom: 4,
		// Uncomment to show a LINE below the title:
		//borderBottomColor: Colors.BlueGrey,
		//borderStyle: 'solid',
		//borderBottomWidth: 1,
	},
	
	// Contains the title of the panel view, inside the title row
  panelTitleContainer: {
    backgroundColor: 'transparent',
  },
	

  panelTitleIcon: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },
	
	// Text style for the Panel Vi
	panelViewTitle: {
		...defaultTextStyles.title2,
		fontWeight: 'bold',
		color: Colors.panelViewTitleColor,
		textAlign: 'left',
	},

  // Text style for the sub-titles in Panels
  panelSubTitle: {
    ...defaultTextStyles.title3,
    textAlign: 'left',
  },

	// Text style for the Panel Icon
	panelIcon: {
		...defaultTextStyles.title2,
		fontWeight: 'bold',
		textAlign: 'right',
	},
	
	// View: children passed to panel
	// Hint: don't set overflow to 'hidden' because that will defeat
	// negative margins that are used to go to the edge of the panel (e.g. by a list).
	panelChildrenContainer: {
		flex: 1,
		marginBottom: 4,

		// borderWidth:2,
		// borderColor:'magenta',
	},

	// View: Text block passed to panel. Similar to children, but more limited.
	// Indented left/right
	panelBodyContainer: {
        marginBottom: 8,
		flexShrink: 1,
		overflow: 'hidden',

		// borderWidth:1,
		// borderColor:'#888',
	},
	
	panelBody: {
		...defaultTextStyles.body,
		//color: 'white',
	},
	
	messageAdditionalInfoContainer: {},
	messageBottomContainer: {},
	
	// Button in Panel View
	panelButton: {
		marginTop: 13,
	},
	
	// ------------------------
	// Flatlist in a Panel View
	
	// Header Container for a flatList in a panel (not using ListHeaderComponent)
	// Should be similar to sectionListItemContainer
	panelFlatlistHeader: {
		justifyContent: 'center',
		backgroundColor: Colors.shadeOf(Colors.BitnationDarkColor, 0.5),
		// Matches the marginLeft: 16 of sectionListItemContainer
		paddingLeft: 16,
		// Standard row height for an iOS list item:
		height: 30,
	},

	//Panel used for Alert about the Status of the Nation in Detail Screen
  panelViewAlert: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.panelViewAlert,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 0,
    marginRight: 0,
    overflow: 'hidden',
    // INDENTS:
    paddingLeft: 10,
    padding: normalizer(5),
  },

  //Label in panel used for Alert about the Status of the Nation in Detail Screen
  panelAlertBold: {
    ...defaultTextStyles.body,
    color: Colors.BitnationHighlightColor,
    fontSize: 13,
    fontWeight: 'bold',
  },

  //Status string in panel used for Alert about the Status of the Nation in Detail Screen
  panelAlertStatus: {
    ...defaultTextStyles.body,
    color: Colors.BitnationHighlightColor,
    fontSize: 13,
  },

  //Panel used for showing the citizenship of a User in Detail Screen
  panelViewCitizen: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.panelView,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 0,
    marginRight: 0,
    overflow: 'hidden',
    // INDENTS:
    paddingLeft: 10,
    padding: normalizer(7),
  },

  panelViewCitizenIcon: {
    width: 25,
    height: 25,
  },

	// ========================================
	// Forms
	// Example: Profile Edit Screen
	
	formRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	
	// Holds an input field in a form, e.g. Profile Edit
	fieldsContainer: {
		alignItems: 'stretch',
		flex: 1,
	},
	
	// Labels on forms, e.g. for a switch
	formLabelText: {
		...defaultTextStyles.body,
		color: 'white',
	},

  formSwitchLabelText: {
    ...defaultTextStyles.body,
    color: 'white',
		marginRight: 60,
		fontSize: 16,
  },
	
	// TextInput component
	textInput: {
		...defaultTextStyles.body,
		
		//backgroundColor: Colors.shadeOfBitnationLightColor(0.2),
		borderColor: Colors.borderColor,
		borderBottomWidth: 1,
		flex: 1,
		marginTop: 4,
		marginBottom: 4,
		marginRight: 0,
		marginLeft: 0,
		fontSize: 16,
		paddingLeft: 4,
		paddingTop: 6,
		paddingBottom: 6,
		// font settings
		//color: Colors.placeholderTextColor,
	},
	
	// text inside of text input fields prompting user to enter information,
	// e.g. 'Name' or 'Country'
	placeHolderText: {
		...defaultTextStyles.body,
		color: Colors.placeholderTextColor
	},
	
	editItemLabel: {
		...defaultTextStyles.body,
		backgroundColor: 'transparent',
		color: Colors.titleColor,
		fontWeight: 'bold',
		margin: 5,
	},
	
	labelText: {
		...defaultTextStyles.body,
		backgroundColor: 'transparent',
		color: Colors.titleColor,
	},
	
	dropDown: {
		backgroundColor: Colors.shadeOfBitnationLightColor(0.2),
		borderColor: Colors.borderColor,
		borderWidth: 1,
		flex: 1,
		marginTop: 4,
		marginBottom: 4,
		marginRight: 0,
		marginLeft: 0,
		paddingLeft: 4,
		paddingTop: 6,
		paddingBottom: 6,
	},
	
	dropDownTextDefault: {
		...defaultTextStyles.body,
		//color: Colors.BitnationLightColor,
		//fontSize: 17,
	},
	
	dropDownTextList: {
		...defaultTextStyles.body,
		color: Colors.BitnationHighlightColor,
	},
	
	switchContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 10,
		// for testing
		borderWidth:0,
		
	},
	
	switchObject: {
		marginRight: 10,
	},

// ========================================
	// Section Lists Layout
	// These are lists with rows divided by section headers, e.g. "A"
	// Example: Nations List screen
	
	// View: Use views inside to fill the space. A FlatList inside this will be sized
	// to fit the space available.
	listContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	
	// Used for SectionList on Nation List screen
	sectionList: {
		flex: 1,
	},
	
	// e.g. NationListItem Text
	listItemText: {
		...defaultTextStyles.body,
		color: 'white',
		flex: 1,
	},
	
	// e.g. NationListItem Text very BOLD
	listItemTextVeryBold: {
		...defaultTextStyles.bodyBlack,
		color: 'white',
		flex: 1,
	},
	
	// e.g. NationListItemState Text
  listItemTextState: {
		...defaultTextStyles.body,
	    color: Colors.listItemTextState,
	    textAlign: 'right',
	    marginRight: 16,
	  },
	
	// e.g. NationListItem, a row in a list of Nations
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
		backgroundColor: Colors.sectionListItemContainerBkgd,
		marginLeft: 16,
	},
	
	// e.g. NationListHeader
	sectionListHeaderContainer: {
		flexDirection: 'row',
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.sectionListHeaderContainer,
		//opacity: 0.5,
	},
	
	sectionListHeaderText: {
		...defaultTextStyles.body,
		flex: 1,
		marginLeft: 16,
		color: Colors.sectionListHeaderText,
	},

	sectionListSeparator: {
		flex: 1,
		marginLeft: 10,
		height:1,
		backgroundColor: Colors.sectionListSeparator,
	},

	sectionListDisclosure: {
		marginRight: 16,
		width: 8,
		height: 15,
	},

	// ========================================
	// Tab Bar with text
	segmentedControlContainer: {
		height: 44,
		marginLeft: normalWidthMargin(),
		marginRight: normalWidthMargin(),
		flexDirection: 'row',
		alignItems: 'center',
	},
	segmentedControlContainerBackground: {
		backgroundColor: 'transparent',
	},
	tabsContainerStyle: {
		backgroundColor: 'transparent',
	},
	tabStyle: {
		backgroundColor: 'transparent',
	},
	tabTextStyle: {
		backgroundColor: 'transparent',
		color: Colors.tabTextStyle,
	},
	activeTabStyle: {
		backgroundColor: Colors.activeTabStyle,
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
		color: Colors.white,
		backgroundColor: 'transparent',
		fontSize: 10,
	},

	//=========================================
	// Styles for the custom Tool Bar replacing the Tab Bar
  fakeBottomBar: {
    paddingTop:5,
    height: isiPhoneXTabBar(55),
    backgroundColor: Colors.LightBlue,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
	
	// ========================================
	// Basic Text Styles, e.g. components/common/Text.js
	
	messageTitle: {
		fontSize: 22,
		color: Colors.titleColor,
		letterSpacing: 0,
		lineHeight: 28,
		textAlign: 'center',
	},
	messageText: {
		fontSize: 17,
		color: Colors.BitnationLightColor,
		letterSpacing: -0.65,
		lineHeight: 20.8,
		textAlign: 'center',
	},
	
	currencyLarge: {
		...defaultTextStyles.largeTitle,
		fontFamily: 'Roboto',
		fontWeight: '300',
		fontSize: 30,
		lineHeight: 36,
		letterSpacing: 0,
		color: Colors.currency,
	},
	
	
	
	buttonTitle: {
		fontSize: 14,
		color: Colors.BitnationLightColor,
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

  buttonContainerMultiple: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 13,
    marginRight: 13,
  },
	
	// ========================================
	// Profile Screen
	// e.g. components/common/PanelView.js
	
	avatarContainer: {
		flexDirection: 'row',
		width: 100,
		alignItems: 'center',
	},
	
	avatarContainerLarge: {
		flex: 1,
		alignItems: 'center',
	},
	
	avatarChangeContainer: {
		alignItems: 'center',
	},
	
	avatarMedium: {
		height: 50,
		width: 50,
		borderRadius: 25,
	},
	
	// Profile View screen
	avatarLarge: {
		height: 100,
		width: 100,
		borderRadius: 50,
		margin: 16,
	},

  privateKeyGridViewContainer: {
    height: 241,
    borderRadius: 8,
    backgroundColor: Colors.shadeOf(Colors.BitnationDarkColor, 0.7),
    paddingTop: 20,
    paddingBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
  },

}

export default styles
