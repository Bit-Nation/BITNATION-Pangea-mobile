import {StyleSheet} from 'react-native';
import { Dimensions,} from 'react-native';
import Colors from '../../global/Colors';

var {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create({

    container:{
    },
    rowStyle:{
        marginTop:'3%',
        flexDirection:'row',
    },

    textBox:{
        width:width*.28,
        height:height*.06,
        backgroundColor:Colors.disabledBoxColor,
        marginLeft:width*.03,
        borderRadius:5,
        opacity:1,
        textAlign:'center',
        justifyContent:'center',
    },

    textKey:{
      marginLeft:3,
      color:'#fff',
    },
    numberRowStyle:{
        flexDirection:'row',
    },

    number:{
        flex:1,
        textAlign:'center',
    }
    
});