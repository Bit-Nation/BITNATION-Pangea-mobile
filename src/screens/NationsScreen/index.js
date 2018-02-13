import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import NationsListScreen from './NationsListScreen';
import { switchNationTab, openNation, requestFetchNations } from '../../actions/nations';
import { screen } from '../../global/Screens';
import { resolveNation } from '../../utils/nations';
import Colors from '../../global/colors';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import i18n from '../../global/i18n';
import { startNationCreation } from '../../actions/modifyNation';

const NEW_BUTTON = 'NEW_BUTTON';

class NationsScreen extends NavigatorComponent {

  constructor(props) {
    super(props);

    this.props.navigator.setButtons(
      {
        leftButtons: [],
        rightButtons: [{
          title: 'New',
          id: NEW_BUTTON,
          buttonColor: Colors.navigationButtonColor,
        }],
      },
    );
  }

  onWillAppear() {
    super.onWillAppear();

    this.props.fetchNations();
  }

  onNavBarButtonPress(id) {
    if (id === NEW_BUTTON) {
      if (_.isEmpty(this.props.wallets)) {
        this._showCreatePrivateKeyAlert();
      } else {
        this.props.startNationCreation();
        this.props.navigator.showModal(screen('NATION_CREATE_SCREEN'));
      }
    }
  }

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

  render() {
    return (
      <NationsListScreen onSelectItem={this._onSelectItem} {...this.props}/>
    );
  }

  _onSelectItem = (id) => {
    const nation = resolveNation(this.props.nations, id);

    if (!nation) {
      return;
    }

    this.props.openNation(id);

    this.props.navigator.push(screen('NATION_DETAILS_SCREEN'));
  };

}

NationsScreen.PropTypes = {
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
  openNation(id) {
    dispatch(openNation(id));
  },
  fetchNations() {
    dispatch(requestFetchNations());
  },
  startNationCreation() {
    dispatch(startNationCreation());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NationsScreen);
