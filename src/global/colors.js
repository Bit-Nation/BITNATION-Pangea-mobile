// @flow

import { Platform } from 'react-native';

// Bitnation colors
// Grayish
const BitnationColor = '#4A90E2'; /* rgb(74, 144, 226) */
const BitnationDarkColor = '#1B395C'; /* rgb(27, 57, 92) */
const BitnationLightColor = '#C0C0C0'; /* rgb(114, 164, 222) */
const BitnationVeryLightColor = '#FFFFFF'; /* rgb(188, 220, 255) */
const BitnationBackgroundColor = '#3e9eff'; /* rgb(62, 158, 255) */

const BitnationLightGrayColor = '#BBBDBF';
const BitnationGrayColor = '#929497';
const BitnationDarkGrayColor = '#58595B';
const BitnationLinkOrangeColor = '#FF8B00';
const BitnationHighlightYellowColor = '#FFCE00';
const BitnationWhiteAlphaColor = 'rgba(255,255,255,0.45)';

// Highlight Color
const BitnationHighlightColor = '#F5A623'; /* rgb(245, 166, 35) */

/**
 * @desc Convert a hex color and an opacity to an rgb or rgba color string
 * @example convertHex("#FF120A")
 * @example convertHex("#FF120A",0.3)
 * @example convertHex("#FF120A", 30)
 * @param {string} hex Hex string of color.
 * @param {number} opacity Value of desired opacity in range from 0 to 1.
 * @return {string} rgba color string.
 */
export const convertHex = (hex: string, opacity: number = 1): string => {
  const adjustedHex = hex.replace('#', '');
  const r = parseInt(adjustedHex.substring(0, 2), 16);
  const g = parseInt(adjustedHex.substring(2, 4), 16);
  const b = parseInt(adjustedHex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
};

/**
 * @desc Calculates a shade of main color with specified opacity.
 * @example newShade = shadeOf("#12CCAA", 0.1) returns rgba(18,204,170,0.1)
 * @param {string} color Hex color string.
 * @param {number} opacity Value of desired opacity in range from 0 to 1.
 * @return {string} Resulted rgba color string.
 */
const shadeOf = (color: string, opacity: number) => convertHex(color, opacity);

/**
 * @desc Returns a shade of Bitnation color.
 * @param {number} opacity Value of desired opacity in range from 0 to 1.
 * @return {string} Resulted rgba color string.
 */
const shadeOfBitnationColor = (opacity: number) => convertHex(BitnationColor, opacity);
/**
 * @desc Returns a shade of Bitnation light color.
 * @param {number} opacity Value of desired opacity in range from 0 to 1.
 * @return {string} Resulted rgba color string.
 */
const shadeOfBitnationLightColor = (opacity: number) => convertHex(BitnationLightColor, opacity);


export default {
  // Helper functions, see definitions for more details.
  shadeOf,
  shadeOfBitnationColor,
  shadeOfBitnationLightColor,
  BitnationColor,
  BitnationDarkColor,
  BitnationLightColor,
  BitnationVeryLightColor,
  BitnationBackgroundColor,
  BitnationHighlightColor,
  BitnationDarkGrayColor,
  // Colors for common Text Styles
  // e.g. large titles on screens
  titleColor: BitnationHighlightColor,
  panelViewTitleColor: 'white',
  currency: '#FFDD15',
  placeholderTextColor: shadeOf(BitnationVeryLightColor, 0.4),

  // Tab Bar (Navigation Bar for the app)
  tabBarBackgroundColor: BitnationDarkGrayColor,
  tabBarSelectedLabelColor: BitnationWhiteAlphaColor,
  tabBarSelectedButtonColor: BitnationWhiteAlphaColor,
  tabBarLabelColor: 'white',
  tabBarButtonColor: 'white',

  // Toolbars (e.g. Create Nation)
  toolBarBackgroundColor: BitnationBackgroundColor,

  // Segmented Control
  activeTabStyle: BitnationLinkOrangeColor,
  tabTextStyle: BitnationLinkOrangeColor,

  // Panel background color
  panelView: 'rgba(255,255,255,0.2)',
  panelViewAlert: 'rgba(245, 166, 35, 0.2)',

  // Other Custom Bitnation Colors
  BlueGrey: '#607D8B',
  BlueMed: '#72A4DE',
  BlueGrayMed: '#6D6D72',

  // FORMS
  buttonColor: '#1C497E',
  disabledButtonTitleColor: '#5F6D7D',
  disabledButtonColor: '#F1F2F6', // gray_200

  // border of a text field
  borderColor: shadeOf(BitnationLightColor, 0.4),

  // Used in multiselect, e.g. Nation Create form
  textColor: '#444A64',
  textPrimary: '#4A4A4A',
  textSecondary: '#9094A3',
  textLight: '#DADCE5',
  buttonPrimary: '#80E5CF',
  primary_red: '#FF5469', // "danger" color

  // Section Lists
  // Header (title rows, e.g. "A")
  // Separator (thin line between rows)
  // 20% white (v0.3.2)
  sectionListSeparator: 'rgba(255,255,255,0.2)',
  sectionListHeaderText: 'white',
  sectionListHeaderContainer: '#3a3a3a', // 'rgba(255,255,255,0.15)',
  sectionListItemContainerBackground: 'transparent',
  // In a list of nations, default color for the far-right text near the ">"
  listItemTextState: {
    default: 'gray',
    accepted: '#4CAF50',
    pending: '#DADCE5',
    rejected: '#FFC107',
    citizensCount: '#DADCE5',
  },

  // Document Colors
  panelBoxColor: '#1b395c',
  instructionTextColor: '#72a4de',
  navButtonTextColor: '#007aff',
  disabledBoxColor: '#bcdcff',
  disabledTextColor: '#275284',
  actionButtonColor: '#1c497e',
  privateKeyTextInputLabelColor: '#F1F1F1',

  // NAVIGATOR COLORS (in SCREENS.JS)
  navBarTextColor: 'white',
  navBarButtonColor: BitnationLinkOrangeColor,
  navBarBackgroundColor: 'transparent',
  navigationButtonColor: Platform.OS === 'ios' ? BitnationLinkOrangeColor : '#FFFFFF',
  statusBarColorOther: 'black',
  statusBarColorIOS: 'black',

  // PLATFORM SPECIFIC COLORS
  androidNavigationButtons: 'white', // in Screens.js

  // Why do we have this? So we can redefine white to something just a little darker
  // because pure white can be hard...sometimes better to use 98% white.
  white: 'white',

  // Used in many places, e.g. Wallet code, identical to 'transparent'
  Transparent: 'transparent',

};
