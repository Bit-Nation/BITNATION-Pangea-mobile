import React from 'react';
import PropTypes from 'prop-types';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Colors from '../../../global/colors';
import NavigatorComponent from '../../../components/common/NavigatorComponent';

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
      <QRCodeScanner
        onRead={this.props.onReadCode}
      />
    );
  }
}

QRCodeScannerScreen.propTypes = {
  onReadCode: PropTypes.func,
};
