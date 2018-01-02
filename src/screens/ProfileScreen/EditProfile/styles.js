import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../../global/Colors';

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  avatarContainer: {
    width: 100,
    alignItems: 'center',
  },
  avatarChangeContainer: {
    alignItems: 'center',
  },
  fieldsContainer: {
    alignItems: 'stretch',
    flex: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  textInput: {
    backgroundColor: Colors.getBitNationLightBlue(0.2),
    borderColor: Colors.borderColor,
    borderWidth: 1,
    color: Colors.white,
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 16,
    marginLeft: 16,
    fontSize: 16,
    paddingLeft: 4,
    paddingTop: 6,
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    backgroundColor: 'transparent',
    color: Colors.titleColor,
    fontSize: 15,
  },
  labelText: {
    backgroundColor: 'transparent',
    color: Colors.titleColor,
    fontSize: 17,
  },
});

export default styles;
