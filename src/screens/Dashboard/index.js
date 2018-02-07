import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from './styles';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import PanelView from '../../components/common/PanelView';
import i18n from '../../global/i18n';
import NationsPanel from './NationsPanel';
import { openNation } from '../../actions/nations';
import { screen } from '../../global/Screens';
import WalletPanel from './WalletPanel';

class Dashboard extends Component {

  _onSelectNation = (id) => {
    this.props.onSelectNation(id);
    this.props.navigator.push(screen('NATION_DETAILS_SCREEN'));
  };

  _onSelectMore = () => {

  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar navBarHidden/>
        <View style={styles.stackView}>
          <View style={styles.activityPanel}>
          </View>
          <View style={styles.bottomContainer}>
            <NationsPanel nations={this.props.nations.nations}
                          onSelectNation={this._onSelectNation}
                          style={styles.nationsPanel}/>
            <View style={styles.rightContainer}>
              <WalletPanel wallets={this.props.wallet.wallets}
                           style={styles.walletPanel}/>
              <PanelView
                title={i18n.t('screens.dashboard.warningPanel.title')}
                body={i18n.t('screens.dashboard.warningPanel.body')}
                buttonTitle={i18n.t('screens.dashboard.warningPanel.button')}
                onButtonClick={this._onSelectMore}
                style={styles.warningPanel}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  onSelectNation(id) {
    dispatch(openNation(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);