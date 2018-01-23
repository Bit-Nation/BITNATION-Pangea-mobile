import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';
import {Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');
const styles = MediaQueryStyleSheet.create(
  {

    scrollContainer: {
        paddingTop: 20,
        backgroundColor: Colors.background
    },

    containerList: {
        flex: 1,
        flexDirection: 'row',
      },
      listName: {
          marginRight:'10%',
          width:'80%',
          justifyContent:'center',
      },
      text: {
        marginLeft: '3%',
        fontSize: 16,
        color:'white',
        marginTop:'3%',
        marginBottom:'4%',
      },

      listItemIconContainer: {
        justifyContent:'flex-start',
      },
      listItemIcon: {
        height: 10,
        width: 10,
        borderRadius: 20,
      },

    container: {
      flexDirection:'column',
      flex:1,
      paddingTop:20,

    },
    backImage : {
        position: 'absolute',
        zIndex:-1,
    },
    firstContainer:
    {
        flex:2,
        flexDirection:'row',
        marginBottom:'1.6%',
        opacity:0.6,
    },


    //Nation, Wallet
    NWContainer:
    {
        flex:1.2,
        flexDirection:'column',
        marginRight:'1.7%',

    },
    NationsContainer: {
        flex:2,
        backgroundColor:Colors.BitnationBlue,
        marginBottom: '5%',
        marginLeft:'5%',
    },


  
    WalletContainer: {
        flex:1,
        backgroundColor:Colors.BitnationBlue,
        marginBottom: '1%',
        marginLeft:'5%',
    },
    
    chatTextContainer :
    {
        flex:1,
        backgroundColor:Colors.Transparent
    },
    chatsText: {
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        marginTop:'1%'
    },

    listContainer: {
        flex:3
    },    
    ChatNationContainer: {
        flex:1,
        flexDirection:'row',
        opacity:0.6,
    },

    chatContainer: {
        flex:1.5,
        backgroundColor:Colors.BitnationBlue,
        borderRadius:8,
        marginLeft:'2%',
        marginRight:'2%',
        marginBottom:'2%'
    },
    demo: {
        position:'absolute',
        marginLeft:'20%',
        marginTop:'10%',
        width:80,
        height:60,
        zIndex:10

    },
    demoContracts: {
        position:'absolute',
        marginLeft:'20%',
        marginTop:'10%',
        width:100,
        height:80,
        zIndex:10,

    },

    logoW: {
        backgroundColor:'red',
        width:'100%',
        height:'90%',
        zIndex:20,
        position:'absolute'

    },

    contractsContainer:{
        flex:1,
        backgroundColor:Colors.BitnationBlue,
        borderRadius:8,
        marginRight:'2%',
        marginBottom:'2%'

    },


    secondContainer: {
        flex:1,
        backgroundColor:Colors.BitnationBlue,
        borderRadius:8,
        paddingRight:'4%',
        paddingLeft:'4%',
        paddingTop:'3%',
        flexDirection:'column',
        opacity:0.6,
        marginLeft:'2%',
        marginRight:'2%',
    },  

    secondText: {
        textAlign:'center',
        fontWeight:'bold',
        color:'white'
    },
    demoWorld: {
        position:'absolute',
        marginLeft:'30%',
        marginTop:'10%',
        width:100,
        height:80,
        zIndex:10
    
    },
    sImage: {
       
        alignItems: 'center',
        height:height*0.20,
        width: width*0.90,
        
    },
    secondImageContainer: {
       height:height*0.18,
        width: width*.30,

     },

});
export default styles;
