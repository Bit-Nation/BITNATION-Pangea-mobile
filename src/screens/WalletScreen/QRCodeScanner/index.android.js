import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Colors from '../../../global/Colors';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Text from '../../../components/common/Text';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';

export default class QRCodeScannerScreen extends NavigatorComponent {

  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: 'Cancel',
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  onNavBarButtonPress(id) {
    if (id === 'cancel') {
      this.props.navigator.dismissModal();
    }
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'black'}}>
        <FakeNavigationBar/>
        <Text messageTitle>
          Android QR code scanner is not supported yet.
        </Text>
      </View>
    );
  }

}

QRCodeScannerScreen.propTypes = {
  onReadCode: PropTypes.func,
};