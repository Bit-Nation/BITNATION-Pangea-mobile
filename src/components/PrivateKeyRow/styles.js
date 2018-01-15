import {StyleSheet} from 'react-native';
import { Dimensions,} from 'react-native';
import Colors from '../../global/Colors';

var {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create({

    rowStyle:{
        marginTop:'3%',
        flexDirection:'row',
    },

    textBox:{
        width:width*.28,
        height:height*.04,
        backgroundColor:Colors.disabledBoxColor,
        marginLeft:width*.03,
        justifyContent:'center',
        borderRadius:5,
        opacity:1,
        
    },

    textKey:{
        textAlign:'center',
        justifyContent:'center',
    },
    numberRowStyle:{
        flexDirection:'row',
    },

    number:{
        flex:1,
        textAlign:'center',
    }
    
});