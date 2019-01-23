// @flow

import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import Background from '../../components/common/BackgroundImage';
import { screen } from '../../global/Screens';
import { selectWallet, updateWalletList } from '../../actions/wallet';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import ScrollTabView, { DefaultTabBar } from '../../components/ScrollTabView';

import ContractScreen from './subTabs/ContractScreen';
import DappScreen from './subTabs/DappScreen';
import ServiceScreen from './subTabs/ServiceScreen';
import ProductScreen from './subTabs/ProductScreen';


import Colors from '../../global/colors';
import AssetsImages from '../../global/AssetsImages';
import styles from './styles';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import type { State as WalletState } from '../../reducers/wallet';
import type { WalletType } from '../../types/Wallet';
import type { Account } from '../../types/Account';
import type { Navigator } from '../../types/ReactNativeNavigation';
import { getCurrentAccount } from '../../reducers/accounts';

import LucyButton from '../../components/common/LucyButton';
import PopOverModal from '../../components/PopOverModal';
import { contractData, dAppData, serviceData, productData } from './helper';

const MENU_BUTTON = 'MENU_BUTTON';
const REMOVE_WALLETS_BUTTON = 'REMOVE_WALLETS_BUTTON';
const LUCY_MODAL_KEY = 'lucyModal';


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
    /**
      * @desc Name of the modal to be shown
      */
    showModal: string,
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

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isRefreshing !== nextProps.isRefreshing &&
      nextProps.isRefreshing === false
    ) {
      this.setState({ pullToRefreshInProgress: false });
    }
  }

  onDidAppear() {
    this.props.updateWalletList();
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

  dismissModal = () => {
    this.setState({
      showModal: '',
    });
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <Background />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <View style={styles.searchBarContainer}>
            <View style={styles.inputViewContainer}>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Search by name, type or category...'
                placeholderTextColor={Colors.BitnationLinkOrangeColor}
                autoCapitalize='none'
              />
              <Image source={AssetsImages.searchIcon} style={styles.searchIconStyle} />
            </View>
          </View>
          <ScrollTabView
            initialPage={0}
            tabBarBackgroundColor={Colors.BitnationBlackAlphaColor}
            tabBarActiveTextColor={Colors.BitnationLinkOrangeColor}
            tabBarInactiveTextColor={Colors.BitnationLinkOrangeColor}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBarTextStyle={styles.tabBarTextStyle}
            renderTabBar={() => <DefaultTabBar />}
          >
            <View tabLabel='DAPPS'>
              <DappScreen

                buttonTitle='USE DAPPS'
                subTitleTable='SIMILAR DAPPS'
                list={dAppData}
              />
            </View>
            <View tabLabel='CONTRACTS'>
              <ContractScreen

                buttonTitle='COPY CONTRACTS CODE'
                subTitleTable='SIMILAR CONTRACTS'
                list={contractData}
              />
            </View>
            <View tabLabel='SERVICES'>
              <ServiceScreen

                buttonTitle='USE SERVICE'
                subTitleTable='SIMILAR SERVICES'
                list={serviceData}
              />
            </View>
            <View tabLabel='PRODUCTS'>
              <ProductScreen

                buttonTitle='USE PRODUCT'
                subTitleTable='SIMILAR PRODUCTS'
                list={productData}
              />
            </View>
          </ScrollTabView>
        </View>
        <LucyButton onPress={() => this.setState({ showModal: LUCY_MODAL_KEY })} />
        <PopOverModal
          visible={this.state.showModal === LUCY_MODAL_KEY}
          onCancel={this.dismissModal}
          options={[
            {
              text: 'Add a new Dapp, Contract, Service',
              onPress: () => {},
            },
            {
              text: 'Help',
              onPress: () => {},
            },
          ]}
        />
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
