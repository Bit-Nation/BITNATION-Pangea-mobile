/*eslint-disable*/
import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';
import {Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');
const styles = MediaQueryStyleSheet.create(
  {

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

      },
      text: {
        marginLeft: '3%',
        fontSize: 16,
        color:'white',
        marginTop:'3%',
        marginBottom:'4%',
        marginRight:'40%'
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
    },
    backImage : {
        position: 'absolute',
        zIndex:-1,
    },
    firstContainer:
    {
        flex:3,
        flexDirection:'row',
        marginBottom:'1.6%',
        
      opacity:0.6,
    },


    //Nation, Wallet, CHat
    NWCContainer:
    {
        flex:1.5,
        flexDirection:'column',
        marginRight:'1.7%',
        //backgroundColor:'red'

    },
    NationsContainer: {
        flex:2,
        backgroundColor:Colors.BitnationBlue,
        marginBottom: '3%',
        borderRadius:8,

    },
    nationsText: {
        color:'white',
        fontWeight:'bold',
        textAlign:'center'
    },
    nationsDescription: {
        color:'white',
        marginLeft:'3%',

    },
  
    WalletContainer: {
        flex:1,
        backgroundColor:Colors.BitnationBlue,
        marginBottom: '3%',
        borderRadius:6

    },
    ChatContainer: {
        flex:2,
        backgroundColor:Colors.BitnationBlue,
        borderRadius:6,
       // tintColor:'blue'

    },
    cnFlex: {

        flex:1,
    },
    chatNationTextContainer :
    {
        flex:1,
    },

    listContainer: {
        flex:2
    },
    //Contract,News
    CNContainer:
    {
        flex:1,
        flexDirection:'column',

    },
    contractsContainer: {
        flex:1,
        backgroundColor:Colors.BitnationBlue,
        marginBottom:'4%',
        borderRadius:8

    },
    NewsContainer: {
        flex:2,
        backgroundColor:Colors.BitnationBlue,
        borderRadius:6

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
    },  
    secondText: {
        textAlign:'center',
        fontWeight:'bold',
        color:'white'
    },
    sImage: {
        width:'100%',
        height:'100%',
        //backgroundColor: 'black'
         backgroundColor:Colors.Transparent,
         //position:'absolute'

    },
    secondImageContainer: {
        backgroundColor: Colors.Transparent,
        width: 160,
        height: 52
     },



  });
export default styles;
