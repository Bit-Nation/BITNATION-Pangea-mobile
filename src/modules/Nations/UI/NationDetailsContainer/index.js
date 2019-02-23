// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import _ from 'lodash';

import NationDetailsScreen from './NationDetailsScreen';
import { switchNationTab, joinNation, leaveNation } from '../../actions/nations';
import { androidNavigationButtons, screen } from '../../global/Screens';
import i18n from '../../global/i18n';
import Colors from '../../global/colors';
import {
  deleteNationDraft,
  startNationEditing,
  submitNation,
} from '../../actions/modifyNation';
import { openedNation, type State as NationState } from '../../reducers/nations';
import { type State as WalletState } from '../../reducers/wallet';
import { type State as ModifyNationState } from '../../reducers/modifyNation';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import { alert, errorAlert } from '../../global/alerts';
import { nationIsDraft } from '../../utils/nations';
import type { Navigator } from '../../types/ReactNativeNavigation';
import type { NationIdType, NationType } from '../../types/Nation';

const EDIT_BUTTON = 'EDIT_BUTTON';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc A boolean prop to indicate whether the nation is Draft or not
   */
  isDraft: boolean,
}

type Actions = {
  /**
   * @desc Function to select the tab on screen
   * @param index Id of the tab to appear on screen
   */
  onSelectTab: (number) => void,
  /**
   * @desc Function to join a nation
   */
  joinNation: () => void,
  /**
   * @desc Function to leave a nation
   */
  leaveNation: () => void,
  /**
   * @desc Function to start the edition of a nation draft
   * @param nation The empty nation's draft
   */
  onStartNationEditing: (NationType) => void,
  /**
   * @desc Function to delete a nation draft
   * @param nationId The Id of the nation to delete
   * @param callback Callback to be called when delete is finished
   */
  onDeleteDraft: (NationIdType, () => void) => void,
  /**
   * @desc Function to submit a nation draft to the blockchain
   * @param nation The selected nation to submit
   * @param callback Callback to be called when submit is finished
   */
  onSubmitDraft: (NationType, () => void) => void,
};

class NationDetailsContainer extends NavigatorComponent
  <Props & Actions & NationState & WalletState & ModifyNationState> {
  static defaultProps: Object;
  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      rightButtons: this.props.isDraft ? [{
        title: 'Edit',
        id: EDIT_BUTTON,
        buttonColor: Colors.navigationButtonColor,
      }] : [],
    });
  }

  onNavBarButtonPress(id) {
    if (id === EDIT_BUTTON) {
      const selectedNation = openedNation(this.props);
      if (selectedNation === null) return;
      this.props.onStartNationEditing(selectedNation);
      this.props.navigator.showModal(screen('NATION_CREATE_SCREEN'));
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

  onDeleteDraft = () => {
    alert('deleteForm', [
      {
        name: 'cancel',
        style: 'cancel',
      }, {
        name: 'delete',
        style: 'destructive',
        onPress: () => {
          if (this.props.openedNationId === null) return;
          this.props.onDeleteDraft(this.props.openedNationId, () => {
            if (this.props.latestError) {
              errorAlert(this.props.latestError);
              return;
            }
            this.props.navigator.pop();
          });
        },
      }]);
  };

  onSubmitDraft = () => {
    alert('submitForm', [
      {
        name: 'cancel',
        style: 'cancel',
      }, {
        name: 'confirm',
        onPress: () => {
          if (this.props.openedNationId === null) return;
          const selectedNation = openedNation(this.props);
          if (selectedNation === null) return;
          this.props.onSubmitDraft(selectedNation, () => {
            if (this.props.latestError) {
              errorAlert(this.props.latestError);
              return;
            }

            this.props.navigator.pop();
          });
        },
      }]);
  };

  onJoinNation = () => {
    this.performIfHasWallet(this.props.joinNation);
  };

  onLeaveNation = () => {
    this.performIfHasWallet(this.props.leaveNation);
  };

  openNationChat = () => {
    const id = this.props.openedNationId;
    const isBot = false;

    this.props.navigator.push({
      ...screen('CHAT_SCREEN'),
      passProps: { isBot, id },
    });
  }

  performIfHasWallet(functionToPerform) {
    if (_.isEmpty(this.props.wallets)) {
      this.showCreatePrivateKeyAlert();
      return;
    }

    functionToPerform();
  }

  render() {
    return (
      <NationDetailsScreen
        {...this.props}
        joinNation={this.onJoinNation}
        leaveNation={this.onLeaveNation}
        deleteDraft={this.onDeleteDraft}
        submitDraft={this.onSubmitDraft}
        openNationChat={this.openNationChat}
      />
    );
  }
}

NationDetailsContainer.defaultProps = {
  latestError: null,
  onSelectTab: () => null,
  joinNation: () => null,
  leaveNation: () => null,
  onStartNationEditing: () => null,
  onDeleteDraft: () => null,
  onSubmitDraft: () => null,
};

const mapStateToProps = state => ({
  ...state.nations,
  ...state.wallet,
  isDraft: (() => {
    const nation = openedNation(state.nations);
    if (nation === null || nation === undefined) {
      return true;
    }
    return nationIsDraft(nation);
  })(),
});

const mapDispatchToProps = dispatch => ({
  onSelectTab(index) {
    dispatch(switchNationTab(index));
  },
  joinNation() {
    dispatch(joinNation());
  },
  leaveNation() {
    dispatch(leaveNation());
  },
  onStartNationEditing(nation) {
    dispatch(startNationEditing(nation));
  },
  onDeleteDraft(nationId, callback) {
    dispatch(deleteNationDraft(nationId, callback));
  },
  onSubmitDraft(data, callback) {
    dispatch(submitNation(data, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NationDetailsContainer);
