import React, { Component } from 'react';
import {
  ListView, Text, Image, Button, ScrollView,
  View, TouchableOpacity, Alert, Platform
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import PrivateKeyRow from '../../../../components/PrivateKeyRow';
import BackgroundScreen from '../../../../components/BackgroundScreen';
import Header from '../../../../components/Header';
import { Dialog } from 'react-native-simple-dialogs';

import { Dimensions, } from 'react-native';
import Colors from '../../../../global/Colors';
import { screen, androidNavigationButtons } from '../../../../global/Screens';

var { height, width } = Dimensions.get('window');

export default class CreateKeyStep3 extends Component {

  static navigatorButtons = { ...androidNavigationButtons };

  state = {
    currIndex: 1,
    dialogVisible: false,
    row1Data: [' ', ' ', ' '],
    row2Data: [' ', ' ', ' '],
    row3Data: [' ', ' ', ' '],
    row4Data: [' ', ' ', ' '],
    row5Data: [' ', ' ', ' '],
    row6Data: [' ', ' ', ' '],
    row7Data: [' ', ' ', ' '],
    row8Data: [' ', ' ', ' '],
    rowDisabled: [true, false, false, false, false, false, false, false],
    renderHelper: 0,
  };

  instruction = 'We will show you a group of 24 words that is the private key that unlocks your wallet.';

  getRowState = (i) => {
    return (this.state.currIndex !== i);
  };

  onNextButtonPressed = () => {


    if (this.state.currIndex < 9) {
      index = this.state.currIndex;
      index++;
      this.setState({ currIndex: index });
      // if (this.state.currIndex === 4) {
      //   this.ShowAlertDialog();
      //   this.setState({ dialogVisible: true });
      // }
      if(this.state.currIndex === 8)
      {  
        this.ShowAlertDialog();
        this.setState({ dialogVisible: true });
      }
    }
  };

  componentWillMount() {
    let obj = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    this.dataEntryPoint(obj);
  }

  dataEntryPoint = (dataObj) => {

    size = 3;

    for (i = 0, j = 0; i < 24; i++, j++) {
      if (j % 3 === 0)
        j = 0;
      if (i < 3) {
        this.state.row1Data[j] = dataObj[i];
      }
      else if (i > 2 && i < 6) {
        this.state.row2Data[j] = dataObj[i];
      }
      else if (i > 5 && i < 9) {
        this.state.row3Data[j] = dataObj[i];
      }
      else if (i > 8 && i < 12) {
        this.state.row4Data[j] = dataObj[i];
      }
      else if (i > 11 && i < 15) {
        this.state.row5Data[j] = dataObj[i];
      }
      else if (i > 14 && i < 17) {
        this.state.row6Data[j] = dataObj[i];
      }
      else if (i > 16 && i < 19) {
        this.state.row7Data[j] = dataObj[i];
      }
      else if (i > 18 && i < 22) {
        this.state.row8Data[j] = dataObj[i];
      }

    }

    this.setState({ renderHelper: 0 });
  };

  renderScreenOverlay() {
    // currently useless
    return (

      <View style={styles.renderScreenOverlay}></View>
    );
  }

  ShowAlertDialog = () => {

    if (Platform.OS === 'ios') {
      if (this.state.dialogVisible === true) {
        return (
          Alert.alert(
            // This is Alert Dialog Title
            'Save Private Key',

            // This is Alert Dialog Message.
            'Are you sure that you write down your private key?',
            [
              // First Text Button in Alert Dialog.
              { text: 'Cancel', onPress: () => this.cancelAlertDialouge(), style: 'cancel' },

              // Second Cancel Button in Alert Dialog.
              { text: 'Continue', onPress: () => this.deleteKey(), },
            ]
          ));
      }
    }
    else {
      return (
        <Dialog
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({ dialogVisible: true })}>
          <Text style={{ fontSize: 16, paddingTop: '9%', paddingBottom: '13%', textAlign: 'center' }}>Do you want to log
            out?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: .5, marginRight: '1%' }}>
              <Button block large style={{ borderRadius: 5 }} backgroundColor='#D64441' title="Cancel"
                      onPress={() => this.cancelAlertDialouge()}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
              </Button>
            </View>
            <View style={{ flex: .5, marginLeft: '1%' }}>
              <Button block large backgroundColor='#3468B1' style={{ borderRadius: 5 }} onPress={() => this.deleteKey()}
                      title="Delete Key">
                <Text style={{ color: '#fff', fontSize: 16 }}>Delete Key</Text>
              </Button>
            </View>

          </View>

        </Dialog>
      );
    }
  };

  cancelAlertDialouge() {
    this.setState({ dialogVisible: false, currIndex: 1 });
  }

  deleteKey() {
    // alert('Key Created');
    this.props.navigator.push(screen('CREATE_KEY_SUCCESS_SCREEN'));
    // this.setState({ dialogVisible: false, currIndex: 1 });
  }

  onBackButtonPressed() {
    if (this.state.currIndex > 1) {
      index = this.state.currIndex;

      this.state.rowDisabled[index - 1] = false;
      if (index - 2 >= 0)
        this.state.rowDisabled[index - 2] = true;

      index--;
      this.setState({ currIndex: index });

    }
    else
        this.ShowAlertDialog();


  }

  renderFooterButton() {

    // if (Platform.OS === "ios")
    {
      return (

        <View style={{ marginTop: height * .1, alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: width * .7, }}>


            <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onBackButtonPressed()}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onNextButtonPressed()}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
    // else{
    //     return(
    //         <View style={{width:width, backgroundColor:'yellow', height:height*.06, marginTop:height*.1, flex:1, flexDirection:'row'}}>
    //             <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onNextButtonPressed()}>
    //                 <View style={styles.buttonStyle}>
    //                     <Text style={styles.buttonText}>Next</Text>
    //                 </View>
    //             </TouchableOpacity>
    //             <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onNextButtonPressed()}>
    //                 <View style={styles.buttonStyle}>
    //                     <Text style={styles.buttonText}>Next</Text>
    //                 </View>
    //             </TouchableOpacity>

    //         </View>
    //     );
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundScreen></BackgroundScreen>
        <View style={styles.instructionBox}>
          <Text style={styles.instructionBoxText}>{this.instruction}</Text>
        </View>
        <ScrollView style={styles.panel}>
          <PrivateKeyRow disabled={this.getRowState(1)} firstIndex={1} values={this.state.row1Data}></PrivateKeyRow>
          <PrivateKeyRow disabled={this.getRowState(2)} firstIndex={4} values={this.state.row2Data}></PrivateKeyRow>
          <PrivateKeyRow disabled={this.getRowState(3)} firstIndex={7} values={this.state.row3Data}></PrivateKeyRow>
          <PrivateKeyRow disabled={this.getRowState(4)} firstIndex={10} values={this.state.row4Data}></PrivateKeyRow>
          <PrivateKeyRow disabled={this.getRowState(5)} firstIndex={13} values={this.state.row5Data}></PrivateKeyRow>
          <PrivateKeyRow disabled={this.getRowState(6)} firstIndex={16} values={this.state.row6Data}></PrivateKeyRow>
          <PrivateKeyRow disabled={this.getRowState(7)} firstIndex={19} values={this.state.row7Data}></PrivateKeyRow>
          <PrivateKeyRow disabled={this.getRowState(8)} firstIndex={22} values={this.state.row88Data}></PrivateKeyRow>
        </ScrollView>

        <View style={{ marginTop: height * .1, alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: width * .7, }}>


            <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onBackButtonPressed()}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.buttonBoxStyle} onPress={() => this.onNextButtonPressed()}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>


        {this.ShowAlertDialog()}
      </View>
    );
  }
}
