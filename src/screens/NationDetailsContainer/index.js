import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationDetailsScreen from './NationDetailsScreen';
import { switchNationTab, joinNation, leaveNation } from '../../actions/nations';
import { androidNavigationButtons, screen } from '../../global/Screens';
import { Alert } from 'react-native';
import i18n from '../../global/i18n';
import Colors from '../../global/colors';
import { startNationEditing } from '../../actions/modifyNation';
import { isDraft, openedNation } from '../../reducers/nations';
import NavigatorComponent from '../../components/common/NavigatorComponent';

const EDIT_BUTTON = 'EDIT_BUTTON';

class NationDetailsContainer extends NavigatorComponent {

  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props) {
    super(props);

    this.props.navigator.setButtons(
      {
        leftButtons: [],
        rightButtons: this.props.isDraft ? [{
          title: 'Edit',
          id: EDIT_BUTTON,
          buttonColor: Colors.navigationButtonColor,
        }] : [],
      },
    );
  }

  onNavBarButtonPress(id) {
    if (id === EDIT_BUTTON) {
      this.props.onStartNationEditing(openedNation(this.props));
      this.props.navigator.showModal(screen('NATION_CREATE_SCREEN'));
    }
  }

  _showCreatePrivateKeyAlert() {
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

  onJoinNation = () => {
    this.performIfHasWallet(this.props.joinNation);
  };

  onLeaveNation = () => {
    this.performIfHasWallet(this.props.leaveNation);
  };

  performIfHasWallet(fn) {
    if (_.isEmpty(this.props.wallets)) {
      this._showCreatePrivateKeyAlert();
    } else {
      fn();
    }
  }

  render() {
    return (
      <NationDetailsScreen {...this.props} joinNation={this.onJoinNation} leaveNation={this.onLeaveNation}/>
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
  isDraft: isDraft(openedNation(state.nations)),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NationDetailsContainer);
