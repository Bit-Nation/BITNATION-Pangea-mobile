import { MediaQueryStyleSheet } from 'react-native-responsive'
import Colors from './colors'
import { normalizer} from '../utils/normalizer'

// ========================================
// DEFAULT TEXT STYLES
// ========================================

const defaultTextStyles = {

	// ========================================
	// Default Text Styles
	// From Apple Human Interface Guidelines
	// https://developer.apple.com/ios/human-interface-guidelines/visual-design/typography/
	
	// Apple Defaults (Do not change):
	/*
	largeTitle: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'bold',
	  fontSize: 34,
	  lineHeight: 41,
	  letterSpacing: 11,
	},
 
	title1: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'bold',
	  fontSize: 28,
	  lineHeight: 34,
	  letterSpacing: 13,
	},
 
	title2: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'normal',
	  fontSize: 22,
	  lineHeight: 28,
	  letterSpacing: 16,
	},
 
 
	title3: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'normal',
	  fontSize: 20,
	  lineHeight: 25,
	  letterSpacing: 19,
	},
 
 
	headline: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'bold',
	  fontSize: 17,
	  lineHeight: 22,
	  letterSpacing: -24,
	},
 
 
	body: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'normal',
	  fontSize: 17,
	  lineHeight: 22,
	  letterSpacing: -24,
	},
 
 
	callout: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'normal',
	  fontSize: 16,
	  lineHeight: 21,
	  letterSpacing: -20,
	},
 
 
	subhead: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'normal',
	  fontSize: 15,
	  lineHeight: 20,
	  letterSpacing: -16,
	},
 
 
	footnote: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'normal',
	  fontSize: 13,
	  lineHeight: 18,
	  letterSpacing: -6,
	},
 
 
	caption1: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'normal',
	  fontSize: 12,
	  lineHeight: 16,
	  letterSpacing: 0,
	},
 
 
	caption2: {
	  fontFamily: 'SF Pro Text',
	  fontWeight: 'normal',
	  fontSize: 11,
	  lineHeight: 13,
	  letterSpacing: 6,
	},
	*/
	
	// ========================================
	// Bitnation App Default Text Styles
	// Derived from Apple Defaults (above)
	
	largeTitle: {
		fontFamily: 'Source Code Pro',
		fontWeight: 'bold',
		fontSize: 34,
		lineHeight: 41,
		letterSpacing: 0,
		color: Colors.BitnationLightColor,
	},
	
	title1: {
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fontSize: 28,
		lineHeight: 34,
		letterSpacing: 0,
		color: Colors.BitnationLightColor,
	},
	
	title2: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		fontSize: 22,
		lineHeight: 28,
		letterSpacing: 0,
		color: Colors.BitnationLightColor,
	},
	
	title3: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		fontSize: 20,
		lineHeight: 25,
		letterSpacing: 0,
	},
	
	headline: {
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fontSize: 17,
		lineHeight: 22,
		letterSpacing: 0,
	},
	
	body: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		fontSize: 17,
		lineHeight: 22,
		letterSpacing: 0,
		color: Colors.BitnationLightColor,
	},
	
	bodyBold: {
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fontSize: 17,
		lineHeight: 22,
		letterSpacing: 0,
		color: Colors.BitnationLightColor,
	},
	
	callout: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		fontSize: 16,
		lineHeight: 21,
		letterSpacing: 0,
	},
	
	subhead: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		fontSize: 15,
		lineHeight: 20,
		letterSpacing: 0,
	},
	
	footnote: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		fontSize: 13,
		lineHeight: 18,
		letterSpacing: 0,
		color: Colors.BitnationLightColor,
	},
	
	caption1: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		fontSize: 12,
		lineHeight: 16,
		letterSpacing: 0,
		color: Colors.BitnationLightColor,
	},
	
	caption2: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		fontSize: 11,
		lineHeight: 13,
		letterSpacing: 0,
		color: Colors.BitnationLightColor,
	},
	
}

// ========================================
// MAIN STYLES
// ========================================

const styles = {
	
	// Use the default text styles
	...defaultTextStyles,
	
	// ========================================
	// Common Layout Elements
	
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
	bodyContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		//alignItems: 'stretch',
		alignContent: 'flex-start',
		marginLeft: 15,
		marginRight: 15,
	},
	
	// A block of text in the body area
	bodyParagraph: {
		paddingBottom: 15,
	},
	
	statusBar: {
		height: 20,
		backgroundColor: 'transparent',
	},
	
	statusBariPhoneX: {
		height: 44,
		backgroundColor: 'transparent',
	},
	
	// Navigation area that shows a normal ("largeTitle" style) title
	navigationBar: {
		marginTop: 20, // force below the status bar !!! THIS IS WRONG
		marginLeft: 8,
		marginRight: 8,
		height: 44,
		backgroundColor: 'transparent',
	},
	
	// Normal left/right margins for the body area (not navigation or status)
	layoutMargin: {
		marginLeft: 16,
		marginRight: 16,
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
	// Panels in a vertical list.
	// These are lists of rectangular panels which contain different kinds of content.
	// These don't have margin left/right, so they won't work for dashboard.
	// Used in:  components/common/PanelView.js

  panelView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
    borderRadius: 8,
    backgroundColor: Colors.shadeOfBitnationColor(0.2),
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 12,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },

	// Panel Title Container for the Title and Icon, below
	panelTitleRowContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingBottom: 4,
    borderBottomColor: Colors.BlueGrey,
    borderStyle: 'solid',
    borderBottomWidth: 1,
	},

  panelTitleContainer: {
    flex: 4,
    backgroundColor: 'transparent',
  },

  panelTitleIcon: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },
	
	// Text style for the Panel Title
	panelTitle: {
		...defaultTextStyles.title2,
		fontWeight: 'bold',
		color: Colors.white,
		textAlign: 'left',
	},

  // Text style for the Panel Title
  panelSubTitle: {
    ...defaultTextStyles.title2,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'left',
		fontSize: 18,
  },

	// Text style for the Panel Icon
	panelIcon: {
		...defaultTextStyles.title2,
		fontWeight: 'bold',
		textAlign: 'right',
	},
	
	panelTextContainer: {
    marginBottom: 8,
	},
	
	panelBody: {
		...defaultTextStyles.body,
		color: Colors.BitnationLightColor,
	},
	
	messageAdditionalInfoContainer: {},
	messageBottomContainer: {},
	
	// Button in Panel View
	panelButton: {
		marginTop: 13,
	},
	
	// ========================================
	// Forms
	// Example: Profile Edit Screen
	
	// Holds an input field in a form, e.g. Profile Edit
	fieldsContainer: {
		alignItems: 'stretch',
		flex: 1,
	},
	
	formRow: {
		flexDirection: 'row',
		alignItems: 'center',
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
		backgroundColor: Colors.shadeOfBitnationLightColor(0.2),
		borderColor: Colors.borderColor,
		borderWidth: 1,
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
		color: Colors.placeholderTextColor,
	},
	
	// text inside of text input fields prompting user to enter information,
	// e.g. 'Name' or 'Country'
	placeHolderText: {
		...defaultTextStyles.body,
		color: Colors.placeholderTextColor
	},
	
	editItemLabel: {
		backgroundColor: 'transparent',
		color: Colors.titleColor,
		fontSize: 15,
		margin: 5,
	},
	
	labelText: {
		backgroundColor: 'transparent',
		color: Colors.titleColor,
		fontSize: 17,
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
		color: Colors.white,
		fontSize: 17,
	},
	
	dropDownTextList: {
		color: Colors.primary_blue,
		fontSize: 17,
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
		backgroundColor: Colors.shadeOfBitnationLightColor(0.8),
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
		fontSize: 17,
		color: Colors.BitnationLightColor,
		letterSpacing: -0.65,
		lineHeight: 20.8,
		textAlign: 'center',
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
		margin: 15,
	},
	
}

export default styles
