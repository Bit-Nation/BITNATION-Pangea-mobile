// @flow

import React from 'react';
import { Alert, View, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import NationsListScreen from './NationsListScreen';
import { switchNationTab, openNation } from '../../actions/nations';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import BackgroundImage from '../../components/common/BackgroundImage';
import { screen } from '../../global/Screens';
import { resolveNation } from '../../utils/nations';
import Colors from '../../global/colors';
import AssetsImages from '../../global/AssetsImages';
import styles from './styles';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import ScrollTabView, { DefaultTabBar } from '../../components/ScrollTabView';
import i18n from '../../global/i18n';
import { startNationCreation } from '../../actions/modifyNation';
import type { Navigator } from '../../types/ReactNativeNavigation';
import { type State as NationState } from '../../reducers/nations';
import { type State as WalletState } from '../../reducers/wallet';
import type { NationIdType } from '../../types/Nation';
import type { NationTab } from '../../actions/nations';

import LucyButton from '../../components/common/LucyButton';
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
        >
          <ScrollTabView
            tabLabel='NEW'
            initialPage={0}
            tabBarBackgroundColor={Colors.lightFade}
            tabBarActiveTextColor={Colors.white}
            tabBarInactiveTextColor={Colors.white}
            tabBarUnderlineStyle={styles.subTabBarUnderlineStyle}
            tabBarTextStyle={styles.subTabBarTextStyle}
            tabBarContainerStyle={styles.subTabBarContainerStyle}
            renderTabBar={() => <DefaultTabBar />}
          >
            <NationsListScreen
              onSelectItem={this.onSelectItem}
              {...this.props}
            />
          </ScrollTabView>
          <ScrollTabView
            tabLabel='FEATURED'
            initialPage={0}
            tabBarBackgroundColor={Colors.lightFade}
            tabBarActiveTextColor={Colors.white}
            tabBarInactiveTextColor={Colors.white}
            tabBarUnderlineStyle={styles.subTabBarUnderlineStyle}
            tabBarTextStyle={styles.subTabBarTextStyle}
            tabBarContainerStyle={styles.subTabBarContainerStyle}
            renderTabBar={() => <DefaultTabBar />}
          >
            <View />
          </ScrollTabView>
          <ScrollTabView
            tabLabel='POPULAR'
            initialPage={0}
            tabBarBackgroundColor={Colors.lightFade}
            tabBarActiveTextColor={Colors.white}
            tabBarInactiveTextColor={Colors.white}
            tabBarUnderlineStyle={styles.subTabBarUnderlineStyle}
            tabBarTextStyle={styles.subTabBarTextStyle}
            tabBarContainerStyle={styles.subTabBarContainerStyle}
            renderTabBar={() => <DefaultTabBar />}
          >
            <NationsListScreen
              onSelectItem={this.onSelectItem}
              isPopular
              {...this.props}
            />
          </ScrollTabView>
        </ScrollTabView>
        <LucyButton
          onPress={() => this.setState({ showModal: LUCY_MODAL_KEY })}
        />
        <PopOverModal
          visible={this.state.showModal === LUCY_MODAL_KEY}
          onCancel={this.dismissModal}
          desText='How can I help you with nations?'
          options={[
            {
              text: 'Create a New Nation',
              onPress: () => {},
            },
            {
              text: 'Report a Nation',
              onPress: () => {},
            },
            {
              text: 'Help with Nations',
              onPress: () => {},
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
