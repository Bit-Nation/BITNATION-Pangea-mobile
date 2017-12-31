/*eslint-disable*/
import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';
const styles = MediaQueryStyleSheet.create(
  {
    container: {
      flexDirection:'column',
      flex:1,
      
    },
    backgroundImage: {
        width:'100%',
        position:'absolute',
    },
  
    header: {
        backgroundColor:'transparent',


    },
    cancel: {
        color:Colors.Blue

    },
    next: {
        color:Colors.Blue   
    },
    title: {
        color:Colors.Background,
        fontSize:16,
        //fontWeight:'400',
        textAlign:'center',
        width:'150%',
        marginLeft:'20%'
       // backgroundColor:'red',
    },
    right: {
       // backgroundColor:'red',
        marginLeft:'20%'
    },
    left: {
       // backgroundColor:'red',
    },
    wholeText: {
        margin:'3%',
        marginTop:'6%',
        marginRight:'2%'
       
    },
    description: {
        color:Colors.Blue,
        fontSize:16,
        marginBottom:'6%',

    },


});
export default styles;
