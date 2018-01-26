var React = require('react-native')
var {
  Dimensions
} = React

var deviceHeight = Dimensions.get('window').height;

export function normalizer (size) {
  if(deviceHeight === 568) {
    return size / 0.65
  } else if(deviceHeight === 667) {
    return size
  } else if(deviceHeight === 736) {
    return size * 1.4
  }
  return size
}