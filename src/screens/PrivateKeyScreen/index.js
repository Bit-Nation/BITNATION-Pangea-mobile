import React, { Component } from 'react';
import {
    ListView, Text, Image, Button,
    View, TouchableOpacityn, Alert, Platform
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import PrivateKeyRow from '../../components/PrivateKeyRow';
import BackgroundScreen from '../../components/BackgroundScreen';
import Header from '../../components/Header';
import { Dialog } from 'react-native-simple-dialogs';

export default class PrivateKeyScreen extends Component{

    state = {
        currIndex : 1,
        dialogVisible : false,
        row1Data : [" ", " ", " "],
        row2Data : [" ", " ", " "],
        row3Data : [" ", " ", " "],
        row4Data : [" ", " ", " "],
    }
     
    instruction = "We will show you a group of 12 words that is the private key that unlocks your wallet.";

    getRowState = (i) => {
        return (this.state.currIndex !== i);
    }

    onNextButtonPressed = () => {

        let obj = ['a','b','c','d','e','f','g','h','i','j','k','l'];
        this.dataEntryPoint(obj);

        if (this.state.currIndex < 5)
        {
            index = this.state.currIndex;
            index++;
            this.setState({currIndex : index});
            if (this.state.currIndex === 4)
            {
                this.ShowAlertDialog();
                this.setState({dialogVisible : true});
            }
        }
    }

    dataEntryPoint = (dataObj) => {

        size = 3;
        
        for (i = 0, j = 0; i < 12; i++, j++)
        {
            if (j%3===0)
                j=0;
            if (i<3)
            {
                this.state.row1Data[j] = dataObj[i];
            }
            else if (i>2 && i<6)
            {
                this.state.row2Data[j] = dataObj[i];}
            else if (i>5 && i<9)
            {
                this.state.row3Data[j] = dataObj[i];}
            else if (i>8 && i<12)
            {
                this.state.row4Data[j] = dataObj[i];}

        }
    }

    renderScreenOverlay(){
        // currently useless
        return (
            
                <View style={styles.renderScreenOverlay}></View>
        );
    }

    ShowAlertDialog = () =>{

        if (Platform.OS === 'ios')
        {
            if (this.state.dialogVisible === true)
            {
                return(
                Alert.alert(
                    
                    // This is Alert Dialog Title
                    'Delete Private Key',
                
                    // This is Alert Dialog Message. 
                    'Are you sure that you want to stop creating this private key?',
                    [
                    // First Text Button in Alert Dialog.
                    {text: 'Cancel', onPress: () => this.cancelAlertDialouge(), style: 'cancel' },
                
                    // Second Cancel Button in Alert Dialog.
                    {text: 'Delete Key', onPress: () => this.deleteKey(),},
                    ]
                ));
            }
        }
        else
        {
            return(
            <Dialog
                visible={this.state.dialogVisible}
                onTouchOutside={() => this.setState({dialogVisible: true})}>
                <Text style={{fontSize:16,paddingTop:'9%',paddingBottom:'13%',textAlign:'center'}}>Do you want to log out?</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flex:.5,marginRight:'1%'}}>
                <Button block large style={{borderRadius:5}} backgroundColor='#D64441' title="Cancel" onPress={() => this.cancelAlertDialouge()}>
                    <Text style={{color:'#fff',fontSize:16}}>Cancel</Text>
                    </Button>
                    </View>
                    <View style={{flex:.5,marginLeft:'1%'}}>
                    <Button block large backgroundColor='#3468B1' style={{borderRadius:5}}  onPress={() => this.deleteKey()} title="Delete Key">
                    <Text style={{color:'#fff',fontSize:16}}>Delete Key</Text>
                    </Button>
                </View>

                </View>
        
            </Dialog>
            );
        }
    }

    cancelAlertDialouge(){
        this.setState({dialogVisible : false, currIndex : 1});
    }

    deleteKey(){
        alert("Key Deleted");
        this.setState({dialogVisible:false, currIndex : 1})
    }

    render(){
        return(    
             <View style={styles.container}>
                 <BackgroundScreen></BackgroundScreen>
                <Header headerTitle="Create Private Key" onRightButtonPress={() => this.onNextButtonPressed()}></Header>
                <View style={styles.instructionBox}>
                    <Text style={styles.instructionBoxText}>{this.instruction}</Text>
                </View>
                 <View style={styles.panel}>
                     <PrivateKeyRow disabled={this.getRowState(1)} firstIndex={1} values={this.state.row1Data} ></PrivateKeyRow>
                     <PrivateKeyRow disabled={this.getRowState(2)} firstIndex={4} values={this.state.row2Data}></PrivateKeyRow>
                     <PrivateKeyRow disabled={this.getRowState(3)} firstIndex={7} values={this.state.row3Data}></PrivateKeyRow>
                     <PrivateKeyRow disabled={this.getRowState(4)} firstIndex={10} values={this.state.row4Data}></PrivateKeyRow>
                 </View>
                 {this.ShowAlertDialog()}
          

             </View>
        );
    }
}

    