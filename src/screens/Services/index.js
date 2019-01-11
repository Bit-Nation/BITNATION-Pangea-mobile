// @flow

import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import Background from '../../components/common/BackgroundImage';
import { screen } from '../../global/Screens';
import { selectWallet, updateWalletList } from '../../actions/wallet';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import LucyButton from '../../components/common/LucyButton';
import ScrollTabView, { DefaultTabBar } from '../../components/ScrollTabView';

import SubTabComponent from './components/SubTabComponent';

import Colors from '../../global/colors';
import AssetsImages from '../../global/AssetsImages';
import styles from './styles';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import type { State as WalletState } from '../../reducers/wallet';
import type { WalletType } from '../../types/Wallet';
import type { Account } from '../../types/Account';
import type { Navigator } from '../../types/ReactNativeNavigation';
import { getCurrentAccount } from '../../reducers/accounts';

const MENU_BUTTON = 'MENU_BUTTON';
const REMOVE_WALLETS_BUTTON = 'REMOVE_WALLETS_BUTTON';
const data = [
  {
    uri: 'https://previews.123rf.com/images/ahasoft2000/ahasoft20001602/ahasoft2000160201444/51968468-heart-ekg-long-shadow-glyph-icon-style-is-a-flat-light-symbol-with-rounded-angles-on-a-red-square-ba.jpg',
    description: 'LOVE4EVER MARRIAGE',
    title: 'Producer: BITNATION Americas LTD',
    subTitle: 'Fees: Standard ETH transaction fee',
  },
  {
    uri: 'https://previews.123rf.com/images/ahasoft2000/ahasoft20001602/ahasoft2000160201444/51968468-heart-ekg-long-shadow-glyph-icon-style-is-a-flat-light-symbol-with-rounded-angles-on-a-red-square-ba.jpg',
    description: 'LOVE4EVER MARRIAGE',
    title: 'Producer: BITNATION Americas LTD',
    subTitle: 'Fees: Standard ETH transaction fee',
  },
  {
    uri: 'https://previews.123rf.com/images/ahasoft2000/ahasoft20001602/ahasoft2000160201444/51968468-heart-ekg-long-shadow-glyph-icon-style-is-a-flat-light-symbol-with-rounded-angles-on-a-red-square-ba.jpg',
    description: 'LOVE4EVER MARRIAGE',
    title: 'Producer: BITNATION Americas LTD',
    subTitle: 'Fees: Standard ETH transaction fee',
  },
  {
    uri: 'https://previews.123rf.com/images/ahasoft2000/ahasoft20001602/ahasoft2000160201444/51968468-heart-ekg-long-shadow-glyph-icon-style-is-a-flat-light-symbol-with-rounded-angles-on-a-red-square-ba.jpg',
    description: 'LOVE4EVER MARRIAGE',
    title: 'Producer: BITNATION Americas LTD',
    subTitle: 'Fees: Standard ETH transaction fee',
  },
];

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
            <ScrollTabView
              tabLabel='DAPPS'
              initialPage={0}
              tabBarBackgroundColor={Colors.lightFade}
              tabBarActiveTextColor={Colors.white}
              tabBarInactiveTextColor={Colors.white}
              tabBarUnderlineStyle={styles.subTabBarUnderlineStyle}
              tabBarTextStyle={styles.subTabBarTextStyle}
              tabBarContainerStyle={styles.subTabBarContainerStyle}
              renderTabBar={() => <DefaultTabBar />}
            >
              <View tabLabel='IDENTITY'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='REGISTRIES'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='EDUCATION'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='SECURITY'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='JUSTICE'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
            </ScrollTabView>
            <ScrollTabView
              tabLabel='CONTRACTS'
              initialPage={0}
              tabBarBackgroundColor={Colors.lightFade}
              tabBarActiveTextColor={Colors.white}
              tabBarInactiveTextColor={Colors.white}
              tabBarUnderlineStyle={styles.subTabBarUnderlineStyle}
              tabBarTextStyle={styles.subTabBarTextStyle}
              tabBarContainerStyle={styles.subTabBarContainerStyle}
              renderTabBar={() => <DefaultTabBar />}
            >
              <View tabLabel='IDENTITY'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='REGISTRIES'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='EDUCATION'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='SECURITY'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='JUSTICE'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
            </ScrollTabView>
            <ScrollTabView
              tabLabel='SERVICES'
              initialPage={0}
              tabBarBackgroundColor={Colors.lightFade}
              tabBarActiveTextColor={Colors.white}
              tabBarInactiveTextColor={Colors.white}
              tabBarUnderlineStyle={styles.subTabBarUnderlineStyle}
              tabBarTextStyle={styles.subTabBarTextStyle}
              tabBarContainerStyle={styles.subTabBarContainerStyle}
              renderTabBar={() => <DefaultTabBar />}
            >
              <View tabLabel='IDENTITY'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='REGISTRIES'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='EDUCATION'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='SECURITY'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='JUSTICE'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
            </ScrollTabView>
            <ScrollTabView
              tabLabel='PRODUCTS'
              initialPage={0}
              tabBarBackgroundColor={Colors.lightFade}
              tabBarActiveTextColor={Colors.white}
              tabBarInactiveTextColor={Colors.white}
              tabBarUnderlineStyle={styles.subTabBarUnderlineStyle}
              tabBarTextStyle={styles.subTabBarTextStyle}
              tabBarContainerStyle={styles.subTabBarContainerStyle}
              renderTabBar={() => <DefaultTabBar />}
            >
              <View tabLabel='IDENTITY'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='REGISTRIES'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='EDUCATION'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='SECURITY'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
              <View tabLabel='JUSTICE'>
                <SubTabComponent
                  uri='https://sfnotary.com/wp-content/uploads/2015/03/San-Franciscos-Favorite-Mobile-Notary-Public1-350x232.jpg'
                  description='Using the BITNATION Public Notary DApp you can notarise jpeg and png versions of your agreements and other important information on the Ethereum chain'
                  title='USE DAPPS'
                  subTitle='SIMILAR DAPPS'
                  list={data}
                />
              </View>
            </ScrollTabView>
          </ScrollTabView>
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
