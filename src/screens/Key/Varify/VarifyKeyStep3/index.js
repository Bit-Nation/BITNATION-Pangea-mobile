import React, { Component } from 'react';
import {
  ListView, Text, Image, Button, TextInput,
  View, TouchableOpacityn, Alert, Platform, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import EnterPrivateKeyRow from '../../../../components/EnterPrivateKeyRow';
import BackgroundScreen from '../../../../components/BackgroundScreen';
import Header from '../../../../components/Header';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './styles';

import { Dimensions, } from 'react-native';
import Colors from '../../../../global/Colors';

var { height, width } = Dimensions.get('window');


export default class EnterPrivateKeyScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currIndex: 1,
      dialogVisible: false,
      rowDisabled: [true, false, false, false],
    };

    this.getPrivateKeys = this.getPrivateKeys.bind(this);
  }

  instruction = 'Enter in the correct order the 12 words that you wrote down as your paper key. Tap a box to begin.';

  getRowState = (i) => {
    return (this.state.currIndex !== i);
  };

  getPrivateKeys(values) {
    console.log(values);
  }

  onNextButtonPressed = () => {
    // this.setState({row2Disabled:true, row1Disabled:false});

    if (this.state.currIndex < 5) {
      index = this.state.currIndex;

      this.state.rowDisabled[index - 1] = false;

      if (index < 4)
        this.state.rowDisabled[index] = true;

      index++;
      this.setState({ currIndex: index });

      if (this.state.currIndex === 4) {
        this.state.rowDisabled[0] = true;
        this.state.rowDisabled[1] = false;
        this.state.rowDisabled[2] = false;
        this.state.rowDisabled[3] = false;

        this.ShowAlertDialog();
        this.setState({ dialogVisible: true });
      }
    }
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
            'Delete Private Key',

            // This is Alert Dialog Message.
            'Are you sure that you want to stop creating this private key?',
            [
              // First Text Button in Alert Dialog.
              { text: 'Cancel', onPress: () => this.cancelAlertDialouge(), style: 'cancel' },

              // Second Cancel Button in Alert Dialog.
              { text: 'Delete Key', onPress: () => this.deleteKey(), },
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

    this.state.rowDisabled[0] = true;
    this.state.rowDisabled[1] = false;
    this.state.rowDisabled[2] = false;
    this.state.rowDisabled[3] = false;

    this.setState({ dialogVisible: false, currIndex: 1 });
  }

  deleteKey() {


    this.state.rowDisabled[0] = true;
    this.state.rowDisabled[1] = false;
    this.state.rowDisabled[2] = false;
    this.state.rowDisabled[3] = false;

    alert('Key Deleted');
    this.setState({ dialogVisible: false, currIndex: 1 });
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
      alert('Back finished');


  }

  render() {
    return (

      <View style={styles.container}>
        <BackgroundScreen></BackgroundScreen>
        <View style={styles.instructionBox}>
          <Text style={styles.instructionBoxText}>{this.instruction}</Text>
        </View>
        <View style={styles.panel}>
          <EnterPrivateKeyRow disabled={this.getRowState(1)} firstIndex={1} getPrivateKeys={this.getPrivateKeys}
                              disabled={this.state.rowDisabled[0]}></EnterPrivateKeyRow>
          <EnterPrivateKeyRow disabled={this.getRowState(2)} firstIndex={4} getPrivateKeys={this.getPrivateKeys}
                              disabled={this.state.rowDisabled[1]}></EnterPrivateKeyRow>
          <EnterPrivateKeyRow disabled={this.getRowState(3)} firstIndex={7} getPrivateKeys={this.getPrivateKeys}
                              disabled={this.state.rowDisabled[2]}></EnterPrivateKeyRow>
          <EnterPrivateKeyRow disabled={this.getRowState(4)} firstIndex={10} getPrivateKeys={this.getPrivateKeys}
                              disabled={this.state.rowDisabled[3]}></EnterPrivateKeyRow>
        </View>

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

    