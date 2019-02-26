import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from 'pangea-common-reactnative/styles/colors';
import GlobalStyles from 'pangea-common-reactnative/styles';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  container: {
    // flex: 1,
  },
  card: {
    width: '100%',
    height: 100,
  },
  headerBackground: {
    backgroundColor: Colors.BitnationLightGrayColor,
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  infoView: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.BitnationBlackAlphaColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  descriptionStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  readMoreText: {
    color: Colors.BitnationLightGrayColor,

  },
  titleView: {
    height: 50,
    backgroundColor: Colors.lightFade,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitleView: {
    height: 40,
    backgroundColor: Colors.Transparent,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  subTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemSeparator: {
    height: 10,
  },
});

export default styles;
