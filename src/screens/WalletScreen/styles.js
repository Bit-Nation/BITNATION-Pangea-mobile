import {StyleSheet} from 'react-native';
import { Dimensions,} from 'react-native';
import Colors from '../../global/Colors';

var {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create({
    backgroundScreen:{
        position:'absolute',
        height:height,
        width:width,
        zIndex : -1,
    },
    header:{
        fontSize:30,
        fontWeight: 'bold',
        color: Colors.white,
        marginTop:'5%',
        marginLeft:'5%',
        opacity:1,
        backgroundColor: Colors.Transparent,
        paddingBottom:'10%',
    },
    cardMain:{
        backgroundColor:'#3d75ad',
        opacity:0.3,
        width: '90%',
        marginLeft:'5%',
        borderRadius : 5,
        marginTop:height*0.03,
    },
    card:{
        height:'30%',
        marginLeft:'2.4%',
        marginRight:'2.4%',
    },
    firstCard:{  // strange issue when use %
        marginTop: 40,
        marginBottom: 10,
    },
    cardContainer:{
        justifyContent:'space-around',
        position:'absolute'
    },
    discpHeading:{
        fontSize:24,
        color:Colors.white,
        textAlign:'center',
        opacity:1,
    },

    discpText:{
        color:Colors.white,
        fontSize:16,
        textAlign:'center',
        marginLeft:'3%',
        marginRight:'3%',
        opacity:1,
    },

    discpButton:{
        backgroundColor: Colors.BitnationBlue,
        opacity:1,
        height:height*.05,
        marginBottom:height*.02,
        marginTop:height*0.01,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },

    discpButtonText:{
        color: Colors.white,
        fontSize:16,
        opacity:1,
        paddingLeft:width*.05,
        paddingRight:width*.05,
    },

  });
  