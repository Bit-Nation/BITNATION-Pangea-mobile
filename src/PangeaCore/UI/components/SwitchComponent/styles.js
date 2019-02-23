import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';

export default StyleSheet.create({
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  item: {
    padding: 10,
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  selectedItem: {
    backgroundColor: Colors.BitnationLinkOrangeColor,
  },
  selectText: {
    color: Colors.white,
  },
  itemText: {
    fontSize: 12,
    paddingTop: 2,
    color: Colors.white,
    textAlign: 'center',
  },
});
