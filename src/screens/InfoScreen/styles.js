import { Dimensions, Platform } from 'react-native';
import colors from '../../global/colors';

const deviceHeight = Dimensions.get('window').height;

export default {
  screenContainer: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    width: null,
    height: null,
  },
  logoShadowImage: {
    flex: 1,
    marginTop: deviceHeight < 600 ? -40 : -10,
    width: null,
    height: null,
    backgroundColor: 'transparent',
  },
  mainContainer: {
    flex: 1,
    marginTop: 40,
    alignSelf: 'center',
  },
  card: {
    marginTop: 40,
  },
  bgView: {
    flex: 1,
    marginTop: deviceHeight / 2 - 15,
    // backgroundColor: commonColor.brandPrimary,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: Platform.OS === 'ios' ? 50 : 50,
  },
  email: {
    marginTop: 60,
    fontSize: 20,
    alignSelf: 'center',
  },
  inputGrp: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    paddingLeft: 10,
    // color: commonColor.textColor,
  },
  formErrorIcon: {
    // color: commonColor.textColor,
    marginTop: 5,
    right: 10,
  },
  formErrorText1: {
    fontSize: Platform.OS === 'android' ? 12 : 15,
    // color: commonColor.brandDanger,
    textAlign: 'right',
    top: -10,
  },
  formErrorText2: {
    fontSize: Platform.OS === 'android' ? 12 : 15,
    color: 'transparent',
    textAlign: 'right',
    top: -10,
  },
  ticketButton: {
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.BitnationActionColor,
    marginTop: 5,
  },
  supportText: {
    color: 'white',
  },
};