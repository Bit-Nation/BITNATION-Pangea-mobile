// @flow

import React from 'react';
import { Alert, View, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import NationsListScreen from './NationsListScreen';
import { switchNationTab, openNation } from '@pangea/nations/nations-actions';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import { screen } from 'pangea-common-reactnative/Screens';
import { resolveNation } from '@pangea/nations/nations-utils';
import Colors from 'pangea-common-reactnative/styles/colors';
import AssetsImages from 'pangea-common-reactnative/assets/AssetsImages';
import styles from './styles';
import NavigatorComponent from '../../NavigatorComponent';
import ScrollTabView, { DefaultTabBar } from 'pangea-common-reactnative/UI/ScrollTabView';
import i18n from 'pangea-common/i18n';
import { startNationCreation } from '@pangea/nations/modifyNation-actions';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import { type State as NationState } from '@pangea/nations/nations-reducers';
import { type State as WalletState } from '@pangea/wallet/wallet-reducers';
import type { NationIdType } from '@pangea/nations/Nation-types';
import type { NationTab } from '@pangea/nations/nations-actions';
import LucyButton from 'pangea-common-reactnative/UI/LucyButton';
import PopOverModal from '../../components/PopOverModal';

const MENU_BUTTON = 'MENU_BUTTON';
const NEW_BUTTON = 'NEW_BUTTON';
const LUCY_MODAL_KEY = 'lucyModal';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type Actions = {
  /**
   * @desc Function to select the tab on screen
   * @param index Id of the tab to appear on screen
   */
  onSelectTab: NationTab => boolean,
  /**
   * @desc Function to open a nation
   * @param id Index of the nation to open
   */
  openNation: NationIdType => void,
  /**
   * @desc Function to start the process of create a nation
   */
  startNationCreation: () => void,
};

type State = {
  /**
   * @desc Flag whether screen is in appear.
   */
  isAppear: boolean,
  /**
   * @desc Name of the modal to be shown
   */
  showModal: string,
};
class NationsScreen extends NavigatorComponent<
  Props & Actions & WalletState & NationState,
  State,
  > {
  constructor(props) {
    super(props);

    this.state = {
      isAppear: false,
      showModal: '',
    };

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

  onNavBarButtonPress(id) {
    if (id === NEW_BUTTON) {
      if (_.isEmpty(this.props.wallets)) {
        this.showCreatePrivateKeyAlert();
      } else {
        this.props.startNationCreation();
        this.props.navigator.showModal(screen('NATION_CREATE_SCREEN'));
      }
    } else if (id === MENU_BUTTON) {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true,
      });
    }
  }

  showCreatePrivateKeyAlert() {
    Alert.alert(
      i18n.t('alerts.walletRequired.title'),
      i18n.t('alerts.walletRequired.subtitle'),
      [
        { text: i18n.t('alerts.walletRequired.cancel'), style: 'cancel' },
        {
          text: i18n.t('alerts.walletRequired.confirm'),
          onPress: () => this.props.navigator.switchToTab({ tabIndex: 3 }),
        },
      ],
      { cancelable: false },
    );
  }

  dismissModal = () => {
    this.setState({
      showModal: '',
    });
  };
  scrollTabView: any;
  render() {
    return (
      <View style={styles.nationsScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.searchBarContainer}>
          <View style={styles.inputViewContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholder='Search by name, type or category...'
              placeholderTextColor={Colors.BitnationLinkOrangeColor}
              autoCapitalize='none'
            />
            <Image
              source={AssetsImages.searchIcon}
              style={styles.searchIconStyle}
            />
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
          ref={(c) => {
            this.scrollTabView = c;
          }}
        >
          <View tabLabel='NEW' style={styles.bodyContainer}>
            <NationsListScreen
              onSelectItem={this.onSelectItem}
              isPopular={false}
              {...this.props}
            />
          </View>
          <View tabLabel='FEATURED' />
          <View tabLabel='POPULAR' style={styles.bodyContainer}>
            <NationsListScreen
              onSelectItem={this.onSelectItem}
              isPopular
              {...this.props}
            />
          </View>
        </ScrollTabView>
        <LucyButton
          onPress={() => this.setState({ showModal: LUCY_MODAL_KEY })}
        />
        <PopOverModal
          visible={this.state.showModal === LUCY_MODAL_KEY}
          onCancel={this.dismissModal}
          desText='You’re in the post-Westphalian future of Nations! Here’s what you can do here!'
          options={[
            {
              text: 'Start a new Nation',
              onPress: () => {
                if (_.isEmpty(this.props.wallets)) {
                  this.showCreatePrivateKeyAlert();
                } else {
                  this.props.startNationCreation();
                  this.props.navigator.showModal(screen('NATION_CREATE_SCREEN'));
                }
              },
            },
            {
              text: 'Join a Nation',
              onPress: () => {
                this.scrollTabView.goToPage(0);
                this.dismissModal();
              },
            },
            {
              text: 'Report a Nation',
              onPress: () => {
                this.dismissModal();
                this.props.navigator.handleDeepLink({
                  link: 'push/INFO_SCREEN',
                });
              },
            },
          ]}
        />
      </View>
    );
  }

  onSelectItem = (id) => {
    const nation = resolveNation(this.props.nations, id);

    if (!nation) {
      return;
    }

    this.props.openNation(id);

    this.props.navigator.push(screen('NATION_DETAILS_SCREEN'));
  };
}

const mapStateToProps = state => ({
  ...state.nations,
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({
  onSelectTab(index) {
    dispatch(switchNationTab(index === 0 ? 'ALL_NATIONS' : 'MY_NATIONS'));
  },
  openNation(id) {
    dispatch(openNation(id));
  },
  startNationCreation() {
    dispatch(startNationCreation());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NationsScreen);
