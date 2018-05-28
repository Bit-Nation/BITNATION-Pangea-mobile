import Colors from '../colors';

const defaultTextStyles = {

  /*

    // CHEAT SHEET: values for font weights

    { fontWeight: '100' }, // Thin
    { fontWeight: '200' }, // Ultra Light
    { fontWeight: '300' }, // Light
    { fontWeight: '400' }, // Regular
    { fontWeight: '500' }, // Medium
    { fontWeight: '600' }, // Semibold
    { fontWeight: '700' }, // Bold
    { fontWeight: '800' }, // Heavy
    { fontWeight: '900' }, // Black

    */

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
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: 0,
    color: Colors.BitnationDarkGrayColor,
  },

  title1: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0,
    color: Colors.BitnationVeryLightColor,
  },

  title2: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
    color: Colors.BitnationVeryLightColor,
  },

  title3: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0,
    color: Colors.BitnationVeryLightColor,
  },

  headline: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
    color: Colors.BitnationVeryLightColor,
  },

  body: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
    color: Colors.BitnationVeryLightColor,
  },

  bodyBold: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
    color: Colors.BitnationVeryLightColor,
  },

  bodyBlack: {
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
    color: Colors.BitnationVeryLightColor,
  },

  callout: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BitnationLightColor,
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

  disabledText: {
    color: Colors.disabledTextColor,
  },
};
export default defaultTextStyles;
