import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

import NationDetailsScreen from './NationDetailsScreen';
import { switchNationTab, joinNation, leaveNation } from '../../actions/nations';
import { androidNavigationButtons, screen } from '../../global/Screens';
import i18n from '../../global/i18n';
import Colors from '../../global/colors';
import { deleteNationDraft, startNationEditing, submitNation } from '../../actions/modifyNation';
import { openedNation } from '../../reducers/nations';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import { alert, errorAlert } from '../../global/alerts';
import { nationIsDraft } from '../../utils/nations';

const EDIT_BUTTON = 'EDIT_BUTTON';

class NationDetailsContainer extends NavigatorComponent {
  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: this.props.isDraft ? [{
        title: 'Edit',
        id: EDIT_BUTTON,
        buttonColor: Colors.navigationButtonColor,
      }] : [],
    });
  }

  onNavBarButtonPress(id) {
    if (id === EDIT_BUTTON) {
      this.props.onStartNationEditing(openedNation(this.props));
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
        onPress: () => this.props.onDeleteDraft(this.props.openedNationId, () => {
          if (this.props.latestError) {
            errorAlert(this.props.latestError);
            return;
          }

          this.props.navigator.pop();
        }),
      }]);
  };

  onSubmitDraft = () => {
    alert('submitForm', [
      {
        name: 'cancel',
        style: 'cancel',
      }, {
        name: 'confirm',
        onPress: () => this.props.onSubmitDraft(openedNation(this.props), () => {
          if (this.props.latestError) {
            errorAlert(this.props.latestError);
            return;
          }

          this.props.navigator.pop();
        }),
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
    /* global _ */
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

NationDetailsContainer.PropTypes = {
  navigator: PropTypes.object,
  isDraft: PropTypes.bool,
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
