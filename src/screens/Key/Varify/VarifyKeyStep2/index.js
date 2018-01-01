import React, { Component } from 'react';
import {
    ListView, Text, Image, Button,
    View, TouchableOpacity, Alert, Platform
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import PrivateKeyRow from '../../../../components/PrivateKeyRow';
import BackgroundScreen from '../../../../components/BackgroundScreen';
import Header from '../../../../components/Header';
import { Dialog } from 'react-native-simple-dialogs';

import { Dimensions,} from 'react-native';
import Colors from '../../../../global/Colors';

var {height, width} = Dimensions.get('window');

export default class VarifyKeyStep2 extends Component{
     
    instruction = "Enter in the correct order the 12 words that you wrote down as your paper key. Tap a box to begin.";
    
    onNextButtonPressed(){
        
    }

    render(){
        return(
            <View style={styles.container}>
                <BackgroundScreen></BackgroundScreen>
                <Header headerTitle="Verify Private Key" rightButtonDisabled={true}></Header>
                <View style={styles.instructionBox}>
                    <Text style={styles.instructionBoxText}>{this.instruction}</Text>
                </View>
                <View style={styles.panel}>
                    <PrivateKeyRow  firstIndex={1} values={['','','']} ></PrivateKeyRow>
                    <PrivateKeyRow firstIndex={4} values={['','','']} ></PrivateKeyRow>
                    <PrivateKeyRow firstIndex={7} values={['','','']} ></PrivateKeyRow>
                    <PrivateKeyRow firstIndex={10} values={['','','']} ></PrivateKeyRow>
                </View>
                <View style={{marginTop:height*.05, width:width}}>
                    <View style={{alignItems:'center'}}>
                    
                        <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onNextButtonPressed()}>
                            <View style={styles.buttonStyle}>
                                <Text style={styles.buttonText}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
   );
    }
}
