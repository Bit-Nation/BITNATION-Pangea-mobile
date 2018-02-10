const React = require('react-native')
const {
  Dimensions
} = React

const disabledForDebugging = true;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

/**
 * Funtion to normalize Font sizes depending on screen size
 * @param size The Font Size
 * @returns {number} The new font size depending the current screen
 */
export function normalizer (size) {
  if (disabledForDebugging) {
    return size;
  }
  if(deviceHeight === 568) {
    return size * 0.65
  } else if(deviceHeight === 667) {
    return size
  } else if(deviceHeight === 736) {
    return size * 1.4
  }
  return size
}

/**
 * Function to calculate the margin of a component using 2/3 of screen
 * @returns {number} The margin to be applied in each side
 */
export function normalWidthMargin() {
  return (deviceWidth / 3) / 2
}