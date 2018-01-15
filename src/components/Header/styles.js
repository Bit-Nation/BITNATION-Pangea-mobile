import {StyleSheet} from 'react-native';
import { Dimensions,} from 'react-native';
import Colors from '../../global/Colors';

var {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create({
 
    headerBar:{
        flexDirection:'row',
        height:height*.04,
        marginTop:height*.02,
        marginBottom:height*.02,
        backgroundColor: Colors.Transparent,
    },

    navButton:{
        width:width*.18,
        justifyContent:'center',

    },

    navButtonText:{
        textAlign:'center',
        fontSize:16,
        color:Colors.navButtonTextColor,
    },

    navHeader:{
        width:width*.64,
        height:'100%',
        justifyContent:'center',
        textAlign:'center',
    },

    navHeaderText:{
        textAlign:'center',
        fontSize:16,
        color:Colors.Background,
    },

    

});