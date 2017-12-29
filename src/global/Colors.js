/*!
 * Theme colours
 */

getBitNationBlue = (alpha) => {
  return 'rgba(188, 220, 255, ' + alpha + ')';
};

module.exports = {

  white: '#FFFFFF',

  BitNationBlue: getBitNationBlue(1),
  BitNationLightBlue: '#72A4DE',
  BitNationVeryLightBlue: '#BCDCFF',
  getBitNationBlue,
  titleColor: '#4A90E2',
  buttonColor: '#1C497E',

};
