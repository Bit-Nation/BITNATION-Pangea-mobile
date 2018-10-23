// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
import { addNewMessage } from '../../actions/activity';
import type { NationIdType } from '../../types/Nation';
import type { State } from '../../reducers';
import type { Navigator } from '../../types/ReactNativeNavigation';
import { getCurrentAccount } from '../../reducers/accounts';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type Actions = {
  /**
   * @desc Callback on nation select.
   * @param {NationIdType} id Id of selected nation.
   */
  onSelectNation: (id: NationIdType) => void
};

type TestingModeProps = {
  /**
   * @desc Function to add dummy log activity message for testing.
   */
  onAddDummyMessage: () => void
};

class Dashboard extends Component<Props & Actions & State & TestingModeProps> {
  onSelectNation = (id) => {
    this.props.onSelectNation(id);
    this.props.navigator.push(screen('NATION_DETAILS_SCREEN'));
  };

  onStartKeyConfirmation = () => {
    this.props.navigator.showModal({
      ...screen('CONFIRM_KEY_INSTRUCTION_SCREEN'),
      passProps: {
        shouldShowCancel: true,
      },
    });
  };

  render() {
    const currentAccount = getCurrentAccount(this.props.accounts);

    return (
      <View
        testID='dashboardView'
        style={styles.screenContainer}
      >
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
              {
                (currentAccount === null || currentAccount.confirmedMnemonic === true) ?
                  <PanelView
                    title={i18n.t('screens.dashboard.warningPanel.title')}
                    style={styles.warningPanel}
                    titleStyle={styles.panelViewTitle}
                  >
                    <Text style={styles.warningPanelBody}>{i18n.t('screens.dashboard.warningPanel.body')}</Text>
                  </PanelView>
                  :
                  <PanelView
                    title={i18n.t('screens.dashboard.confirmKeyPanel.title')}
                    style={styles.confirmKeyPanel}
                    titleStyle={styles.alertPanelViewTitle}
                    buttonTitle={i18n.t('screens.dashboard.confirmKeyPanel.button')}
                    onButtonClick={this.onStartKeyConfirmation}
                  >
                    <Text style={styles.confirmKeyBody}>{i18n.t('screens.dashboard.confirmKeyPanel.body')}</Text>
                  </PanelView>
              }
            </View>
          </View>
        </View>
      </View >
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
  onAddDummyMessage() {
    dispatch(addNewMessage('dummy message'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
