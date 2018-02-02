import { StyleSheet } from 'react-native';
import { Dimensions, } from 'react-native';
import Colors from '../../../../global/colors';

const { height, width } = Dimensions.get('window');

export default styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  privateKeyDemoImage: {
    width: width - 30,
    height: (width - 30) / 500 * 386,
  },
  contentContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
  },
  instructionContainer: {
    marginTop: 8,
    backgroundColor: Colors.Transparent,
    marginBottom: 20,
  },
  instruction: {
    textAlign: 'left',
  },
  gridView: {
    flex: 1,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: '12%',
  },

});
