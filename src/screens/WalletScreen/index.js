import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

import Background from '../../components/common/BackgroundImage';
import Screens from '../../global/Screens';
import List from './List';
import EmptyWalletScreen from './EmptyState/index';

class WalletScreen extends Component {

  createWallet = () => {
    this.props.navigator.push(Screens.CREATE_KEY_SCREEN_STEP_1);
  };

  restoreWallet = () => {
    this.props.navigator.push(Screens.VERIFY_KEY_SCREEN_STEP_1);
  };

  render() {
    return (
      <View>
        <Background/>
        {this.props.ethAddress ?
          <List/>
          :
          <EmptyWalletScreen
            onCreateWallet={this.createWallet}
            onRestoreWallet={this.restoreWallet}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.wallet
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
