import {StyleSheet} from 'react-native';
import { Dimensions,} from 'react-native';
import Colors from '../../global/Colors';

var {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create({
    
    container:{
        height:height*0.25,
        width:width*.9,
        marginLeft:'5%',
        backgroundColor:Colors.Transparent,
    },

    titleContainer:{
        flex:1.5,
        width:'100%',
        flexDirection:'column',
        backgroundColor:Colors.Transparent,
    },

    buttonContainer:{
        flex:1,
        width:'80%',
        marginLeft:'20%',
        backgroundColor:Colors.Transparent,
    },

    descriptionContainer:{
        flex:1,
        width:'77%',
        marginLeft:'23%',
        backgroundColor:Colors.Transparent,
    },

    avatar:{
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:50,
        marginTop:'3%',
        marginLeft:'3%',
    },
    discriptionColumn:{
        flexDirection:'column',
        width:'70%',
        marginLeft:'4%',
        marginTop:'3%',
    },
    nextButton:{
        width:20,
        height:20,
        marginTop:'3%',
        marginLeft:'1%',
    },

    nameHeading:{
        fontSize:20,
        color:'#a3a5a7',
        fontWeight:'bold',
    },

    nameSubheading:{
        fontSize:16,
        color:'#486b8e',
    },

    buttonBoxStyle:{
        flex:1,
        marginLeft:'3%',
        marginTop:'2%',
    },
    buttonStyle:{
        backgroundColor:Colors.BlueMed,
        opacity:1,
        height:'80%',
        borderRadius:16,
        justifyContent:'center',
    },

    buttonText:{
        color:'#ffff',
        textAlign:'center',
        fontSize:16,
        opacity:1,
        backgroundColor: Colors.Transparent,
    },

    messageText:{
        color:'#486b8e',
        fontSize:16,
    },

    flatListStyle:{
        backgroundColor:'#fff',
        height:'40%',
        flex:1,
        flexDirection:'row',
    }

});
