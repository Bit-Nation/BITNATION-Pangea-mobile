import React, { Component } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import PanelView from '../../../components/common/PanelView';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';

export default class EmptyWalletScreen extends Component {

  texts = {
    createWalletTitle: 'Create a Wallet',
    createWalletText: 'A wallet holds money, such as Ethereum. You will need a wallet to pay for services, such as creating and editing nations, notarizing documents, and other useful services.',
    restoreWalletTitle: 'Restore a Wallet',
    restoreWalletText: 'If you need to restore your wallet (because you lost or upgraded your phone) use the button below.\nYou will need your private key to restore your wallet.',
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <PanelView
            title={this.texts.createWalletTitle}
            body={this.texts.createWalletText}
            buttonTitle='Create a Wallet'
            onButtonClick={this.props.onCreateWallet}
          />
          <PanelView
            title={this.texts.restoreWalletTitle}
            body={this.texts.restoreWalletText}
            buttonTitle='Restore a Wallet'
            onButtonClick={this.props.onRestoreWallet}
          />
        </ScrollView>
      </View>
    );
  }
}

EmptyWalletScreen.PropTypes = {
  onCreateWallet: PropTypes.func.isRequired,
  onRestoreWallet: PropTypes.func.isRequired,
};

