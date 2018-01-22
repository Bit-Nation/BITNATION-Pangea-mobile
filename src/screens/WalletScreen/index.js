import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Background from '../../components/common/BackgroundImage';
import { screen } from '../../global/Screens';
import List from './List';
import EmptyWalletScreen from './EmptyState/index';
import { selectWallet, updateWalletList } from '../../actions/wallet';

class WalletScreen extends Component {

  constructor(props) {
    super(props);

    this.props.updateWalletList();
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
  ...state.wallet
});

const mapDispatchToProps = dispatch => ({
  selectWallet(wallet) {
    dispatch(selectWallet(wallet));
  },
  updateWalletList() {
    dispatch(updateWalletList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
