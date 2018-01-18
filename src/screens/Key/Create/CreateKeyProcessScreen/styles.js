import { StyleSheet } from 'react-native';
import Colors from '../../../../global/Colors';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  contentContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
  },
  instructionContainer: {
    marginTop: 14,
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
    height: 241,
    borderRadius: 8,
    backgroundColor: 'rgba(27,57,92,0.7)',
    paddingTop: 20,
    paddingBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '12%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    width: 90,
  },

});
