// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import PanelView from '../../components/common/PanelView';
import i18n from '../../global/i18n';
import WalletPanel from './WalletPanel';
import ActivityPanel from './ActivityPanel';
import NationsPanel from './NationsPanel';
import { openNation } from '../../actions/nations';
import { screen } from '../../global/Screens';
import { addDummyMessage, startFetchMessages } from '../../actions/activity';
import type { NationIdType } from '../../types/Nation';
import type { State } from '../../reducers';
import type { Navigator } from '../../types/ReactNativeNavigation';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
}

type Actions = {
  /**
   * @desc Callback on nation select.
   * @param {NationIdType} id Id of selected nation.
   */
  onSelectNation: (id: NationIdType) => void,
  /**
   * @desc Function to start activity log messages fetch from database.
   */
  startFetchMessages: () => void,
}

type TestingModeProps = {
  /**
   * @desc Function to add dummy log activity message for testing.
   */
  onAddDummyMessage: () => void,
}

class Dashboard extends Component<Props & Actions & State & TestingModeProps> {
  constructor(props) {
    super(props);

    this.props.startFetchMessages();
  }

  onSelectNation = (id) => {
    this.props.onSelectNation(id);
    this.props.navigator.push(screen('NATION_DETAILS_SCREEN'));
  };

  onSelectMore = () => {

  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar navBarHidden />
        <View style={styles.gridContainer}>
          <View style={styles.activityPanelContainer}>
            <ActivityPanel
              style={styles.activityPanel}
              messages={this.props.activity.messages}
              testingMode={this.props.testingMode}
              onAddDummyMessage={this.props.onAddDummyMessage}
            />
          </View>
          <View style={styles.bottomContainer}>
            <NationsPanel
              nations={this.props.nations.nations}
              onSelectNation={this.onSelectNation}
              style={styles.nationsPanel}
              loadingInProgress={this.props.nations.inProgress}
            />
            <View style={styles.rightContainer}>
              <WalletPanel
                wallets={this.props.wallet.wallets || []}
                style={styles.walletPanel}
              />
              <PanelView
                title={i18n.t('screens.dashboard.warningPanel.title')}
                style={styles.warningPanel}
                titleStyle={styles.panelViewTitle}
              >
                <Text style={styles.warningPanelBody}>{i18n.t('screens.dashboard.warningPanel.body')}</Text>
              </PanelView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  onSelectNation(id) {
    dispatch(openNation(id));
  },
  startFetchMessages() {
    dispatch(startFetchMessages());
  },
  onAddDummyMessage() {
    dispatch(addDummyMessage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
