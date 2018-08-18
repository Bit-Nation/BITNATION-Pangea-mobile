// @flow

import React from 'react';
import { View, Modal, WebView } from 'react-native';
import { connect } from 'react-redux';
import { Item, Left, Icon } from 'native-base';
import _ from 'lodash';
import Background from '../../components/common/BackgroundImage';
import { screen } from '../../global/Screens';
import List from './List';
import EmptyWalletScreen from './EmptyState/index';
import { selectWallet, updateWalletList } from '../../actions/wallet';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import i18n from '../../global/i18n';
import styles from '../NationsScreen/NationsListScreen/styles';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import type { State as WalletState } from '../../reducers/wallet';
import type { WalletType } from '../../types/Wallet';
import type { Navigator } from '../../types/ReactNativeNavigation';
import ScreenTitle from '../../components/common/ScreenTitle';

const REMOVE_WALLETS_BUTTON = 'REMOVE_WALLETS_BUTTON';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Wallet object.
   */
  wallet: WalletType,
};

type TestingModeProps = {
  /**
   * @desc Flag that shows if testing mode is active.
   */
  testingModeActive: boolean,
  /**
   * @desc Function to remove all wallets.
   */
  removeWallets: () => void,
};

type Actions = {
  /**
   * @desc Function to select wallet.
   * @param {WalletType} wallet Wallet to be selected.
   */
  selectWallet: (wallet: WalletType) => void,
  /**
   * @desc Function to request wallet list update.
   */
  updateWalletList: () => void,
};

type State = {
  /**
   * @desc Flag to control Refreshing on Pull to Refresh
   */
  pullToRefreshInProgress: boolean,
  /**
   * @desc Flag to control opening of transactions Modal
   */
  transactionsVisible: boolean,
};

class WalletScreen extends NavigatorComponent<
  Props & TestingModeProps & Actions & WalletState,
  State,
> {
  constructor(props) {
    super(props);

    this.state = {
      pullToRefreshInProgress: false,
      transactionsVisible: false,
    };
    this.props.updateWalletList();
  }

  updateNavigation() {
    this.props.navigator.setButtons({
      leftButtons: this.props.testingModeActive
        ? [
          {
            id: REMOVE_WALLETS_BUTTON,
            title: i18n.t('testingMode.removeWallets'),
          },
        ]
        : [],
      rightButtons: [],
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isRefreshing !== nextProps.isRefreshing &&
      nextProps.isRefreshing === false
    ) {
      this.setState({ pullToRefreshInProgress: false });
    }
  }

  componentDidUpdate() {
    this.updateNavigation();
  }

  onDidAppear() {
    this.props.updateWalletList();
    this.updateNavigation();
  }

  onNavBarButtonPress(id) {
    if (id === REMOVE_WALLETS_BUTTON) {
      this.props.removeWallets();
    }
  }

  createWallet = () => {
    this.props.navigator.showModal(screen('CREATE_KEY_INTRODUCTION_SCREEN'));
  };

  restoreWallet = () => {};

  sendMoney = (wallet) => {
    this.props.selectWallet(wallet);
    this.props.navigator.push(screen('SEND_MONEY_SCREEN'));
  };

  receiveMoney = (wallet) => {
    this.props.selectWallet(wallet);
    this.props.navigator.push(screen('RECEIVE_MONEY_SCREEN'));
  };

  transactions = () => {
    this.setState({ transactionsVisible: true });
  };

  onRefresh = () => {
    this.setState({ pullToRefreshInProgress: true });
    this.props.updateWalletList();
  };

  close() {
    this.setState({ transactionsVisible: false });
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Background />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.wallet.title')} />
          {this.props.wallets === null || _.isEmpty(this.props.wallets) ? (
            <EmptyWalletScreen
              onCreateWallet={this.createWallet}
              onRestoreWallet={this.restoreWallet}
            />
          ) : (
            <List
              wallets={this.props.wallets}
              onSendPress={this.sendMoney}
              onReceivePress={this.receiveMoney}
              onTransactionPress={this.transactions}
              onRefresh={this.onRefresh}
              isRefreshing={this.state.pullToRefreshInProgress}
            />
          )}
        </View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.transactionsVisible}
          onRequestClose={() => this.close()}
          backDropOpacity={1}
        >
          <View>
            <Item onPress={() => this.setState({ transactionsVisible: false })}>
              <Left>
                <Icon name='ios-close' style={styles.closeIcon} />
              </Left>
            </Item>
          </View>
          {this.props.wallet &&
            <WebView
              source={{
                uri: `https://etherscan.io/address/${
                  this.props.wallet.ethAddress
                  }`,
              }}
            />
          }
        </Modal>
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
  removeWallets() {},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletScreen);
