import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationDetailsScreen from './NationDetailsScreen';
import { switchNationTab, openNation, joinNation, leaveNation } from '../../actions/nations';
import { androidNavigationButtons } from '../../global/Screens';
import { Alert } from 'react-native';
import i18n from '../../global/i18n';

class NationDetailsContainer extends Component {

  static navigatorButtons = { ...androidNavigationButtons };

  _showCreatePrivateKeyAlert() {
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
      fn()
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
};

const mapStateToProps = state => ({
  ...state.nations,
  ...state.wallet,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NationDetailsContainer);
