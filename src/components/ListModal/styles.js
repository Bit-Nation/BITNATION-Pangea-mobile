import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';
import {Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');
const styles = MediaQueryStyleSheet.create(
  {

 
      listName: {
          marginRight:'10%',
          width:'80%',
          justifyContent:'center',
      },
      text: {
        marginLeft: '10%',
        fontSize: 16,
        color:'white',
        marginTop:'1%',
        marginBottom:'7%',
      },
 
      photo2: {
        height: 10,
        width: 10,
        borderRadius: 20,
      },
      line2: {
          backgroundColor:'black',
          width:'100%',
          marginLeft:'2%',
          height:1
      },
      separator: {
        width:'100%',
        marginLeft:'3%',
        height: 1,
        backgroundColor:Colors.GraySilver,
      },

      chatTextContainer :
      {
          flex:1,
      },
      chatsText: {
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        marginTop:'1%'
    },

        cFlex: {

            flex:1,
            backgroundColor:Colors.BitnationBlue,
            marginBottom: '5%',
            marginLeft:'5%',
            borderRadius:4,

        },

        listContainer: {
            flex:5
        },



  });
export default styles;