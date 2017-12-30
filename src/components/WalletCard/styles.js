/*eslint-disable*/
import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';

const styles = MediaQueryStyleSheet.create({
  container:{
    flexDirection: 'column',
    flex:1,
   // alignItems:   'flex-start',
   // flexWrap:   'wrap',
   // padding:20,
  // shadowOpacity: 2.75,
  // shadowRadius: 5,
 //  shadowColor: 'red',
   //backgroundColor:Colors.backgroundColor,
    //overflow:'hidden'  // does not work
  },

  title:{
    fontSize: 14,
    marginTop:'3%',
    fontWeight:'bold',
    textAlign:'center',
    color: 'white',
    fontFamily:'Roboto-Medium',
  },
    
  description:{
    fontSize: 14,
    marginTop:'5%',
    marginLeft:'4%',
    marginRight:'30%',
    color: 'white',
    fontFamily:'Roboto-Medium',
  },


});

export default styles;