// @flow

import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import NationsListScreen from './NationsListScreen';
import { switchNationTab, openNation } from '../../actions/nations';
import { screen } from '../../global/Screens';
import { resolveNation } from '../../utils/nations';
import Colors from '../../global/colors';
import AssetsImages from '../../global/AssetsImages';
import BaseTabComponent from '../../components/common/BaseTabComponent';
import i18n from '../../global/i18n';
import { startNationCreation } from '../../actions/modifyNation';
import type { Navigator } from '../../types/ReactNativeNavigation';
import { type State as NationState } from '../../reducers/nations';
import { type State as WalletState } from '../../reducers/wallet';
import type { NationIdType } from '../../types/Nation';
import type { NationTab } from '../../actions/nations';

const MENU_BUTTON = 'MENU_BUTTON';
const NEW_BUTTON = 'NEW_BUTTON';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
}

type Actions = {
  /**
   * @desc Function to select the tab on screen
   * @param index Id of the tab to appear on screen
   */
  onSelectTab: (NationTab) => boolean,
  /**
   * @desc Function to open a nation
   * @param id Index of the nation to open
   */
  openNation: (NationIdType) => void,
  /**
   * @desc Function to start the process of create a nation
   */
  startNationCreation: () => void,
}

class NationsScreen extends BaseTabComponent<Props & Actions & WalletState & NationState> {
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
      rightButtons: [{
        title: 'New',
        id: NEW_BUTTON,
        buttonColor: Colors.navigationButtonColor,
      }],
    });
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
        { text: i18n.t('alerts.walletRequired.confirm'), onPress: () => this.props.navigator.switchToTab({ tabIndex: 3 }) },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <NationsListScreen onSelectItem={this.onSelectItem} {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NationsScreen);
