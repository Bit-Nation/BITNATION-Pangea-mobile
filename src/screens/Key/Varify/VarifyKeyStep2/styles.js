import {StyleSheet} from 'react-native';
import { Dimensions,} from 'react-native';
import Colors from '../../../../global/Colors';

var {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create({
    panel:{
        width:width*.95,
        marginLeft:width*.025,
        backgroundColor : Colors.panelBoxColor,
        paddingBottom:height*.04,
        borderRadius:10,
        opacity:.4,
    },
    instructionBox:{
        marginTop:height*.08,
        marginLeft:width*.03,
        paddingBottom : height*.05,
        backgroundColor : Colors.Transparent,
    },
    instructionBoxText:{
        textAlign:'left',
        color:Colors.instuctionTextColor,
    },

    renderScreenOverlay:{
        width:width,
        height:height,
        backgroundColor:Colors.Black,
        opacity:.9,
        zIndex:1,
        position:'absolute',
    },
    buttonBoxStyle:{
        width:width*.4,
        marginLeft:'3%',
        marginTop:'2%',
    },
    buttonStyle:{
        backgroundColor:Colors.BlueMed,
        opacity:1,
        height:height*.05,
        borderRadius:16,
        justifyContent:'center',
        width:width*.4,
    },

    buttonText:{
        color:'#fff',
        textAlign:'center',
        fontSize:16,
        opacity:1,
        backgroundColor:Colors.Transparent,
    },


});