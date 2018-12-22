import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default {
  container: {
    shadowColor: '#aaa',
    shadowOffset: { width: 3, height: 3, borderRadius: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    width: width * 0.4,
    height: 180,
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'scroll',
    marginBottom: 13,
    marginRight: 30,
  },
  image: {
    flex: 0.66,
  },
  photo: {
    position: 'absolute',
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    top: 108,
    left: 15,
  },
  userImage: {
    flex: 1,
  },
  bottom: {
    flex: 0.2,
    marginLeft: 15,
    paddingBottom: 2,
  },
  description: {
    color: '#000',
    opacity: 0.8,
    fontSize: 13,
    marginTop: 22,
    // fontFamily: styleGuide.font.RobotoSlabRegular,
  },
  title: {
    color: '#000',
    fontSize: 17,
    opacity: 0.87,
    // fontFamily: styleGuide.font.UbuntuMedium,
  },
};
