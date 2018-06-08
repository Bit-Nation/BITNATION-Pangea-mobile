import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/colors';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
  },
  composer: {
    backgroundColor: Colors.shadeOfBitnationLightColor(0.2),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    color: Colors.BitnationDarkGrayColor,
    paddingLeft: 4,
    marginRight: 5,
  },
  inputToolbar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    paddingRight: 5,
  },
  customTextStyle: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    color: Colors.BitnationDarkGrayColor,
  },
  leftBubbleWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  rightBubbleWrapper: {
    flex: 1,
    backgroundColor: Colors.BitnationHighlightYellowColor,
  },
  leftTextStyle: {
    color: Colors.BitnationDarkGrayColor,
  },
  rightTextStyle: {
    color: Colors.BitnationDarkGrayColor,
  },
});

export default styles;
