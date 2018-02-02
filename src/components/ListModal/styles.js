import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/colors';
import {Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');
const styles = MediaQueryStyleSheet.create(
  {

      listName: {
          marginRight:'10%',
          width:'80%',
          justifyContent:'center',
      },
      textStyle: {
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        marginTop:'1%'
    },
      text: {
        marginLeft: '10%',
        fontSize: 16,
        color:'white',
        marginTop:'1%',
        marginBottom:'7%',
      },

      textContainer :
      {
          flex:1,
          backgroundColor:'transparent',
      },
        container: {
            flex:1,
            marginBottom: '5%',
            marginLeft:'5%',
            borderRadius:8,

        },

        listContainer: {
            flex:5
        },

    });
export default styles;
