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

});