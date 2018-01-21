import React, { Component } from 'react';
import {
    ListView, Text, Image, Button,
    View, TouchableOpacity
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Colors from '../../global/Colors';

const PrivateKeyRow = (props) => {

    getBoxColor = () => {
        if (props.disabled == true)
            return Colors.grey_400;
        else
            return Colors.BitnationColor;
    }

    getTextColor = () => {

//        return Colors.Background;
        if (props.disabled == true) //  disabled
            return Colors.Yellow;
        else
            return Colors.Background;
    }

    getNumberColor = () => {
        if (props.disabled == true)
            return Colors.disabledTextColor;
        else
            return Colors.Background;
    }
    return(
        <View style={styles.container}>
             <View style={styles.rowStyle}>
                <View style={[styles.textBox, {backgroundColor:getBoxColor()}]}>
                    <Text style={[styles.textKey, {color:getTextColor()}]}>{props.values[0]}</Text>
                </View>
                <View style={[styles.textBox, {backgroundColor:getBoxColor()}]}>
                    <Text style={[styles.textKey, {color:getTextColor()}]}>{props.values[1]}</Text>
                </View>
                <View style={[styles.textBox, {backgroundColor:getBoxColor()}]}>
                    <Text style={[styles.textKey, {color:getTextColor()}]}>{props.values[2]}</Text>
                </View>
            </View><View style={styles.numberRowStyle}>
                <Text style={[styles.number, {color : getNumberColor()}]}>{props.firstIndex}</Text>
                <Text style={[styles.number, {color : getNumberColor()}]}>{props.firstIndex+1}</Text>
                <Text style={[styles.number, {color : getNumberColor()}]}>{props.firstIndex+2}</Text>
            </View>
        </View>

    );
}

PrivateKeyRow.propTypes = {
    
    values : PropTypes.array,
    disabled : PropTypes.bool,
    firstIndex : PropTypes.number,
};
    
PrivateKeyRow.defaultProps = {
    values : ["Key 1", "Key 2", "Key 3"],
    disabled : false,
    firstIndex : 1,
};


export default PrivateKeyRow;