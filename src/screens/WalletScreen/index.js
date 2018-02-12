import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Background from '../../components/common/BackgroundImage';
import { screen } from '../../global/Screens';
import List from './List';
import EmptyWalletScreen from './EmptyState/index';
import { selectWallet, updateWalletList } from '../../actions/wallet';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import { removeAllPrivateKeys } from '../../actions/key';
import i18n from '../../global/i18n';
import styles from '../NationsScreen/NationsListScreen/styles'
import FakeNavigationBar from '../../components/common/FakeNavigationBar';

const REMOVE_WALLETS_BUTTON = 'REMOVE_WALLETS_BUTTON';

class WalletScreen extends NavigatorComponent {

  constructor(props) {
    super(props);

    this.props.updateWalletList();
  }

  componentDidUpdate() {
    this.props.navigator.setButtons({
      leftButtons: this.props.testingModeActive ? [{
        id: REMOVE_WALLETS_BUTTON,
        title: i18n.t('testingMode.removeWallets'),
      }] : [],
      rightButtons: [],
    });
  }

  onWillAppear() {
    super.onWillAppear();

    this.props.updateWalletList();
  }

  onNavBarButtonPress(id) {
    if (id === REMOVE_WALLETS_BUTTON) {
      this.props.removeWallets();
    }
  }

  createWallet = () => {
    this.props.navigator.showModal(screen('CREATE_KEY_INTRODUCTION_SCREEN'));
  };

  restoreWallet = () => {
    this.props.navigator.showModal(screen('LOAD_WALLET_SCREEN'));
  };

  sendMoney = (wallet) => {
    this.props.selectWallet(wallet);
    this.props.navigator.push(screen('SEND_MONEY_SCREEN'));
  };

  receiveMoney = (wallet) => {
    this.props.selectWallet(wallet);
    this.props.navigator.push(screen('RECEIVE_MONEY_SCREEN'));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Background/>
	      <FakeNavigationBar/>
	      <View style={styles.titleContainer}>
		      {/* TITLE OF SCREEN */}
		      <View style={styles.titleBarLarge}>
			      <Text style={styles.largeTitle}>{i18n.t('screens.wallet.title')}</Text>
		      </View>
	      </View>
        {_.isEmpty(this.props.wallets) ?
          <EmptyWalletScreen
            onCreateWallet={this.createWallet}
            onRestoreWallet={this.restoreWallet}
          />
          :
          <List
            {...this.props}
            onSendPress={this.sendMoney}
            onReceivePress={this.receiveMoney}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.wallet,
  testingModeActive: state.testingMode.isActive,
});

const mapDispatchToProps = dispatch => ({
  selectWallet(wallet) {
    dispatch(selectWallet(wallet));
  },
  updateWalletList() {
    dispatch(updateWalletList());
  },
  removeWallets() {
    dispatch(removeAllPrivateKeys());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
