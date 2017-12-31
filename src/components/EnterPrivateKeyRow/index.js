import React, { Component } from 'react';
import {
    ListView, Text, Image, Button, TextInput,
    View, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../global/Colors';
import styles from './styles';

const EnterPrivateKeyRow = (props) => {

        state = {
            text1Enabled : true,
            text2Enabled : false,
            text3Enabled : false,
        };
    getBoxColor = () => {
        if (props.disabled == true)
            return Colors.Blue;
        else
            return Colors.Background;
    }

    getTextColor = () => {

        if (props.disabled == true)
            return Colors.disabledTextColor;
        else
            return Colors.Background;
    }

    dataSubmitted = (val) => {
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
                        <TextInput editable={props.disabled} style={[styles.textKey, {color:getTextColor()}]} onSubmitEditing={() => this.dataSubmitted(1)}></TextInput>
                </View>
                 <View style={[styles.textBox, {backgroundColor:getBoxColor()}]}>
                    <TextInput underlineColorAndroid='transparent' editable={props.disabled} autoCorrect={false} style={[styles.textKey, {color:getTextColor()}]} onSubmitEditing={() => this.dataSubmitted(2)}></TextInput>
                </View> 
                <View style={[styles.textBox, {backgroundColor:getBoxColor()}]}>
                    <TextInput underlineColorAndroid='transparent' editable={props.disabled} autoCorrect={false} style={[styles.textKey, {color:getTextColor()}]} onSubmitEditing={() => this.dataSubmitted(3)}></TextInput>
                </View>
            </View>
            <View style={styles.numberRowStyle}>
                <Text style={[styles.number, {color : getNumberColor()}]}>{props.firstIndex}</Text>
                <Text style={[styles.number, {color : getNumberColor()}]}>{props.firstIndex+1}</Text>
                <Text style={[styles.number, {color : getNumberColor()}]}>{props.firstIndex+2}</Text>
            </View>
        </View>
    );
}

EnterPrivateKeyRow.propTypes = {
    
    values : PropTypes.array,
    disabled : PropTypes.bool,
    firstIndex : PropTypes.number,
    getPrivateKeys : PropTypes.func,
};
    
EnterPrivateKeyRow.defaultProps = {
    values : ["","",""],
    disabled : false,
    firstIndex : 1,
    getPrivateKeys : () => null,
};

export default EnterPrivateKeyRow;