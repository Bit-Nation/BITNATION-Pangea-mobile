import { Platform } from 'react-native';

/*
	BITNATION COLORS
*/

// ========================================
// BASE COLORS

// Grayish
const BitnationColor = '#4A90E2';         /* rgb(74, 144, 226) */
const BitnationDarkColor = "#1B395C";    /* rgb(27, 57, 92) */
const BitnationLightColor = "#C0C0C0";   /* rgb(114, 164, 222) */
const BitnationVeryLightColor = "#FFFFFF"; /* rgb(188, 220, 255) */
const BitnationBackgroundColor = '#3e9eff'; /* rgb(62, 158, 255) */

// Highlight Color
const BitnationHighlightColor = '#F5A623'; /* rgb(245, 166, 35) */

// Blue Color
//const BitnationColor = '#4A90E2';         /* rgb(74, 144, 226) */
//const BitnationDarkColor = "#1B395C";    /* rgb(27, 57, 92) */
//const BitnationLightColor = "#72A4DE";   /* rgb(114, 164, 222) */
//const BitnationVeryLightColor = "#BCDCFF"; /* rgb(188, 220, 255) */
//const BitnationBackgroundColor = '#3e9eff'; /* rgb(62, 158, 255) */

// ========================================
// FUNCTIONS

export const isEmpty = (v) => {
	return !(typeof(v) !== 'undefined' && v);
}

// Convert a hex color and an opacity to an rgb or rgba color string
// The opacity can be either 0-1 or 0-100.
// example: convertHex("#FF120AE")
// example: convertHex("#FF120AE",0.3)
// example: convertHex("#FF120AE",30)
export const convertHex = (hex, opacity) => {
	hex = hex.replace('#','');
	const r = parseInt(hex.substring(0,2), 16);
	const g = parseInt(hex.substring(2,4), 16);
	const b = parseInt(hex.substring(4,6), 16);
	
	let result;
	if (isEmpty(opacity)) {
		result = 'rgb('+r+','+g+','+b + ')';
	} else {
		if (opacity > 1) {
			opacity = opacity / 100;
		}
		result = 'rgba('+r+','+g+','+b+','+ opacity +')';
	}
	return result;
}

// Return the string for a shade of an RGBa color, based on an hex RGB color
// newshade = shadeOf("#12CCAA", 10) returns rgba(18,204,170,0.1)
const shadeOf = (c, opacity) => {
	return convertHex(c,opacity);
}

// a : alpha (number)
// example: shadeOfBitnationColor(opacity) returns an rgba string.
const shadeOfBitnationColor = (opacity) => {
	return convertHex(BitnationColor,opacity);
};
const shadeOfBitnationLightColor = (opacity) => {
	return convertHex(BitnationLightColor,opacity);
};


// ========================================
// COLOR DEFINITIONS

export default {
	
	// Functions for getting shades of other colors, e.g. Colors.shadeOf(Colors.BitnationColor, '0.2')
	// See comments above the functions, below.
	shadeOf,
	shadeOfBitnationColor,
	shadeOfBitnationLightColor,
	
	BitnationColor: BitnationColor,
	BitnationDarkColor: BitnationDarkColor,
	BitnationLightColor: BitnationLightColor,
	BitnationVeryLightColor: BitnationVeryLightColor,
	BitnationBackgroundColor: BitnationBackgroundColor,
	BitnationHighlightColor: BitnationHighlightColor,
	
	// Colors for common Text Styles
	// e.g. very large titles on screens
	titleColor: BitnationHighlightColor,
	
	
	// Tab Bar (Navigation Bar for the app)
	tabBarBackgroundColor: BitnationBackgroundColor,
	tabBarSelectedLabelColor: 'white',
	tabBarSelectedButtonColor: 'white',
	tabBarLabelColor: '#a6c5e5',
	tabBarButtonColor: '#a6c5e5',
	
	// Toolbars (e.g. Create Nation)
	toolBarBackgroundColor: BitnationBackgroundColor,
	
	// Segmented Control
	activeTabStyle: BitnationBackgroundColor,
	tabTextStyle: BitnationBackgroundColor,
	
	// Panel background color
	panelView: 'rgba(255,255,255,0.2)',
	
	// Other Custom Bitnation Colors
	BlueGrey: '#607D8B',
	BlueMed: '#72A4DE',
	BlueGrayMed: '#6D6D72',
	
	// FORMS
	buttonColor: '#1C497E',
	disabledButtonColor: '#37393C',
	disabledButtonTitleColor: '#5F6D7D',
	// border of a text field
	borderColor: shadeOf(BitnationLightColor, 0.4),
	navigationButtonColor: Platform.OS === 'ios' ? '#007AFF' : '#FFFFFF',

	placeholderTextColor: shadeOf(BitnationVeryLightColor, 0.4),
	
	textColor: '#444A64',
	textPrimary: '#4A4A4A',
	textSecondary: '#9094A3',
	textLight: '#DADCE5',
	buttonPrimary: '#80E5CF',
	bestOptionBackground: '#BDF4E9',
	
	primary_green: '#A5D6A7',
	secondary_green: '#BDF4E9',
	primary_blue: '#444A64',
	primary_red: '#FF5469',
	grey_400: '#9094A3',
	grey_300: '#DADCE5',
	grey_200: '#F1F2F6',
	grey_100: '#F9F9FC',
	
	// Section Lists
	// Separator (title rows, e.g. "A")
	// Separator (thin line between rows)
	// 20% white (v0.3.2)
	sectionListSeparator: 'rgba(255,255,255,0.2)',
	sectionListHeaderText: 'white',
	sectionListHeaderContainer: '#3a3a3a',//'rgba(255,255,255,0.15)',
	sectionListItemContainerBkgd: 'transparent',
	// In a list of nations, default color for the far-right text near the ">"
	listItemTextState: 'gray',
	
	// Document Colors
	panelBoxColor: '#1b395c',
	instructionTextColor: '#72a4de',
	navButtonTextColor: '#007aff',
	disabledBoxColor: '#bcdcff',
	disabledTextColor: '#275284',
	actionButtonColor: '#1c497e',
	
	
	// Why do we have this? So we can redefine white to something just a little darker
	// because pure white can be hard...sometimes better to use 98% white.
	white: 'white',
	
	// Why do we have these definitions?
	Red: '#FF5252',
	Pink: '#FF4081',
	Purple: '#9C27B0',
	DeepPurple: '#673AB7',
	Indigo: '#3F51B5',
	Blue: '#2196F3',
	LightBlue: '#03A9F4',
	Cyan: '#00BCD4',
	Teal: '#009688',
	Green: '#4CAF50',
	LightGreen: '#8BC34A',
	Lime: '#CDDC39',
	Yellow: '#FFEB3B',
	Amber: '#FFC107',
	Orange: '#FF9800',
	DeepOrange: '#FF5722',
	Brown: '#795548',
	Grey: '#9E9E9E',
	LightGrey: '#EEEEEE',
	Transparent: 'transparent',
	
}
