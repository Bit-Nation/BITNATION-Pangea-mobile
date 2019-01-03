// @flow

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Background from '../../components/common/BackgroundImage';
import { screen, androidNavigationButtons } from '../../global/Screens';
import Card from '../../components/Card';
import { selectWallet, updateWalletList } from '../../actions/wallet';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import LucyButton from '../../components/common/LucyButton';

import Colors from '../../global/colors';
import AssetsImages from '../../global/AssetsImages';
import i18n from '../../global/i18n';
import styles from './styles';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import type { State as WalletState } from '../../reducers/wallet';
import type { WalletType } from '../../types/Wallet';
import type { Account } from '../../types/Account';
import type { Navigator } from '../../types/ReactNativeNavigation';
import { getCurrentAccount } from '../../reducers/accounts';
import ScreenTitle from '../../components/common/ScreenTitle';

const MENU_BUTTON = 'MENU_BUTTON';
const REMOVE_WALLETS_BUTTON = 'REMOVE_WALLETS_BUTTON';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Current user object.
   */
  user: Account | null,
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
   * @desc Flag whether screen is in appear.
   */
  isAppear: boolean,
  /**
   * @desc Flag to control Refreshing on Pull to Refresh
   */
  pullToRefreshInProgress: boolean,
  /**
   * @desc Stores Transaction Modal state
   */
  transactionModal: {
    /**
     * @desc Flag to control the visibility of modal
     */
    visible: boolean,
    /**
     * @desc Stores the ETH Address
     */
    ethAddress?: string,
  },
};

class ServicesScreen extends NavigatorComponent<
  Props & TestingModeProps & Actions & WalletState,
  State,
  > {
  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: MENU_BUTTON,
          icon: AssetsImages.menuIcon,
          buttonColor: Colors.navigationButtonColor,
        },
      ],
      rightButtons: [],
    });

    this.state = {
      isAppear: false,
      pullToRefreshInProgress: false,
      transactionsVisible: false,
      ethAddress: '',
      transactionModal: {
        visible: false,
        ethAddress: '',
      },
    };
    this.props.updateWalletList();
  }

  onWillAppear() {
    this.setState({ isAppear: true });
  }

  onWillDisappear() {
    this.setState({ isAppear: false });
  }

  onHandleDeepLink(event) {
    if (this.state.isAppear) {
      const parts = event.link.split('/');
      if (parts[0] === 'push') {
        this.props.navigator.push(screen(parts[1]));
      }
    }
  }

  updateNavigation() {
    const { leftButtons } = androidNavigationButtons;
    this.props.navigator.setButtons({
      leftButtons: this.props.testingModeActive
        ? [
          {
            id: REMOVE_WALLETS_BUTTON,
            title: i18n.t('testingMode.removeWallets'),
          },
        ]
        : leftButtons,
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
    } else if (id === MENU_BUTTON) {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true,
      });
    }
  }

  createWallet = () => {
    this.props.navigator.showModal(screen('CREATE_KEY_INTRODUCTION_SCREEN'));
  };

  restoreWallet = () => { };

  sendMoney = (wallet) => {
    this.props.selectWallet(wallet);
    this.props.navigator.push(screen('SEND_MONEY_SCREEN'));
  };

  receiveMoney = (wallet) => {
    this.props.selectWallet(wallet);
    this.props.navigator.push(screen('RECEIVE_MONEY_SCREEN'));
  };

  showTransactions = (wallet) => {
    this.setState({
      transactionModal: { visible: true, ethAddress: wallet.ethAddress },
    });
  };

  onRefresh = () => {
    this.setState({ pullToRefreshInProgress: true });
    this.props.updateWalletList();
  };

  transactionModalClose() {
    this.setState({ transactionModal: { visible: false } });
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Background />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          {/* <ScreenTitle title={i18n.t('screens.wallet.title')} /> */}
          <ScreenTitle title='Services' />
          <Card style={styles.card}>
            <TouchableOpacity onPress={() => this.props.navigator.push(screen('DOCUMENTS_LIST_SCREEN'))}>
              <Card.Square
                title='Notary'
                uri='https://www.clipartmax.com/png/middle/273-2736662_stamp-of-approval-notary.png'
                style={styles.squareCard}
              />
            </TouchableOpacity>
            <Card.Square
              title='Dapps'
              uri='https://blog.bitnation.co/wp-content/uploads/fractals_3.jpg'
              style={styles.squareCard}
            />
          </Card>
          <Card style={styles.card}>
            <Card.Square
              title='Contracts'
              uri='https://apngbc.org.au/assets/default-site/_resampled/ScaleWidthWyI3OTUiXQ/Contract-Law-hero.gif'
              style={styles.squareCard}
            />
            <Card.Square
              title='Products'
              uri='https://banner2.kisspng.com/20180202/kwe/kisspng-passport-canada-canadian-passport-icon-canadian-passport-color-of-the-material-5a74fa54d506a0.7507633215176157008726.jpg'
              style={styles.squareCard}
            />
          </Card>
        </View>
        <LucyButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.wallet,
  testingModeActive: state.testingMode.isActive,
  user: getCurrentAccount(state.accounts),
});

const mapDispatchToProps = dispatch => ({
  selectWallet(wallet) {
    dispatch(selectWallet(wallet));
  },
  updateWalletList() {
    dispatch(updateWalletList());
  },
  removeWallets() { },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServicesScreen);
