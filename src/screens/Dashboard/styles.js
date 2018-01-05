/*eslint-disable*/
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
        //alignItems: 'center',
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

      listIcon: {
          
        justifyContent:'flex-start',

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
      //  borderRadius:3,

    },


  
    WalletContainer: {
        flex:1,
        backgroundColor:Colors.BitnationBlue,
        marginBottom: '1%',
        marginLeft:'5%',
    //    borderRadius:4

    },

    cFlex: {

        flex:1,
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

    listContainer: {
        flex:3
    },
    //Activity
    ActivityContainer:
    {
        flex:1.5,
        flexDirection:'row',
        backgroundColor:Colors.BitnationBlue,
        marginRight:'2%',
        borderRadius:4

    },


    
    ChatNationContainer: {
        flex:1,
        flexDirection:'row',
        opacity:0.6,
    },

    chatContainer: {
        flex:1.5,
        backgroundColor:Colors.BitnationBlue,
        borderRadius:5,
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
        borderRadius:4,
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
        height:height*0.30,
        width: width*0.90,
        
    },
    secondImageContainer: {
       height:height*0.20,
        width: width*.30,
        paddingBottom:5,

     },

});
export default styles;
