/*!
 * react-native-multi-select
 * Copyright(c) 2017 Mustapha Babatunde Oluwaleke
 * MIT Licensed
 */
import Colors from '../../global/colors'

export const colorPack = {
  primary: Colors.BitnationHighlightColor,//'#00A5FF',
  primaryDark: '#215191',
  light: 'transparent',//Colors.shadeOfBitnationLightColor(0.2),
  textPrimary: Colors.white,
  placeholderTextColor: Colors.white,
  danger: Colors.primary_red,
  borderColor: Colors.borderColor,
  backgroundColor: Colors.shadeOfBitnationLightColor(0.2),
};

export default {
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  footerWrapperNC: {
    width: 320,
    flexDirection: 'column',
  },
  subSection: {
    backgroundColor: colorPack.light,
    borderBottomWidth: 1,
    borderColor: colorPack.borderColor,
    paddingLeft: 0,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greyButton: {
    height: 40,
    borderRadius: 5,
    elevation: 0,
    backgroundColor: colorPack.actionButtonColor,
  },
  indicator: {
    fontSize: 30,
    color: colorPack.placeholderTextColor,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    margin: 3,
    borderRadius: 20,
    borderWidth: 2,
  },
  button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  selectorView: (fixedHeight) => {
    const style = {
      flexDirection: 'column',
      marginBottom: 0,
      elevation: 2,
    }
    if (fixedHeight) {
      style.height = 250;
    }
    return style;
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: colorPack.light,
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
    marginBottom: 0,
  },
};
