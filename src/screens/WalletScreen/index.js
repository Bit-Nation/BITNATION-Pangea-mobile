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
import { selectWallet } from '../../actions/wallet';

class WalletScreen extends Component {

  createWallet = () => {
    this.props.navigator.push(screen('CREATE_KEY_SCREEN_STEP_1'));
  };

  restoreWallet = () => {
    this.props.navigator.push(screen('VERIFY_KEY_SCREEN_STEP_1'));
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
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
