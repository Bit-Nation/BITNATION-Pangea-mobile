import {StyleSheet} from 'react-native';
import { Dimensions,} from 'react-native';
import Colors from '../../global/Colors';

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
        backgroundColor: Colors.Transparent,
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
    }
});