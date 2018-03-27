// @flow
import {
  FOUR_INCHES,
  FOUR_DOT_SEVEN_INCHES,
  FIVE_DOT_FIVE_INCHES,
} from '../global/Constants';

const React = require('react-native');

const {
  Dimensions, Platform,
} = React;

const disabledForDebugging = false;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

/**
 * Funtion to normalize Font sizes depending on screen size
 * @param {number} size The original font size
 * @returns {number} The new font size depending the current screen
 */
export function fontSizeNormalizer(size: number) {
  if (disabledForDebugging && __DEV__) {
    return size;
  }
  if (deviceHeight === FOUR_INCHES) {
    return size * 0.65;
  } else if (deviceHeight === FOUR_DOT_SEVEN_INCHES) {
    return size;
  } else if (deviceHeight === FIVE_DOT_FIVE_INCHES) {
    return size * 1.4;
  }
  return size;
}

/**
 * Function to calculate the margin of a component using 2/3 of screen
 * @returns {number} The margin to be applied in each side
 */
export function normalWidthMargin() {
  return (deviceWidth / 3) / 2;
}

/**
 * Function to fix the height of Status Bar ONLY in the iPhoneX
 * @param {number} size The actual device's screen size
 * @returns {number} The correct size for the Status Bar
 */
export function isiPhoneXStatusBar(size: number) {
  if (Platform.OS === 'ios' && (deviceHeight === 812 || deviceWidth === 812)) {
    return size + 24;
  }
  return size;
}

/**
 * Function to fix the height of Fake Tab Bar ONLY in the iPhoneX
 * @param {number} size The actual device's screen size
 * @returns {number} The correct size for the Fake Tab Bar
 */
export function isiPhoneXTabBar(size: number) {
  if (Platform.OS === 'ios' && (deviceHeight === 812 || deviceWidth === 812)) {
    return size + 29;
  }
  return size;
}
