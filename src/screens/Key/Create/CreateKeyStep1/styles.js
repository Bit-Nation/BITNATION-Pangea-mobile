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
        fontSize:26,
        fontWeight:'400',
        marginLeft:'3%'
    },
    wholeText: {
        margin:'3%',
        marginTop:'8%',
        marginRight:'2%'
       
    },
    description: {
        color:Colors.Blue,
        fontSize:16,
        marginBottom:'6%',

    },


});
export default styles;
