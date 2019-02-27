// @flow

import React, { Component } from 'react';
import {
  View,
  Text, ScrollView,
} from 'react-native';

import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import styles from './styles';
import NationActionButton from 'pangea-common-reactnative/UI/NationActionButton';
import AssetsImage from 'pangea-common-reactnative/assets/AssetsImages';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import i18n from 'pangea-common/i18n';
import { openedNation, type State as NationState } from '@pangea/nations/nations-reducers';
import PanelViewAlert from 'pangea-common-reactnative/UI/PanelViewAlert';
import PanelViewCitizen from 'pangea-common-reactnative/UI/PanelViewCitizen';
import { nationIsValid, resolveStatus } from '@pangea/nations/nations-utils';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import type { NationType } from '@pangea/nations/Nation-types';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc A boolean prop to indicate whether the nation is Draft or not
   */
  isDraft: boolean,
};

type Actions = {
  /**
   * @desc Function to join a nation
   */
  joinNation: () => void,
  /**
   * @desc Function to leave a nation
   */
  leaveNation: () => void,
  /**
   * @desc Function to delete the draft of a nation
   */
  deleteDraft: () => void,
  /**
   * @desc Function to submit a nation to the blockchain
   */
  submitDraft: () => void,
  /**
   * @desc Function to open a nation's chat
   */
  openNationChat: () => void,
}

class NationDetailsScreen extends Component<Props & Actions & NationState> {
  static disableJoinButton(nation: NationType) {
    if (nation.tx && nation.tx.status === 200) {
      return true;
    }

    if (nation.joined === true) {
      return true;
    }

    return false;
  }

  static disableLeaveButton(nation: NationType) {
    if (nation.tx && nation.tx.status === 200) {
      return true;
    }

    if (nation.joined === false) {
      return true;
    }

    return false;
  }

  static buildAboutView(nation: NationType) {
    return (
      <PanelView
        style={styles.panelView}
        childrenContainerStyle={styles.noflex}
        title={i18n.t('screens.nationDetails.aboutInfo', { name: nation.nationName })}
      >
        <Text style={styles.panelSubTitle}>
          {`${i18n.t('screens.nationDetails.description')}:`}
        </Text>
        <Text style={styles.body}>
          {nation.nationDescription ? `${nation.nationDescription}\n` : ''}
          {`${i18n.t('screens.nationDetails.locationInfo', {
            name: nation.nationName,
            locationType: nation.exists ?
              i18n.t('enums.nation.locationType.geographical') :
              i18n.t('enums.nation.locationType.virtual'),
          })}\n`}
        </Text>
        <Text style={styles.panelSubTitle}>
          {i18n.t('screens.nationDetails.ethereumAddress')}
        </Text>
        <Text style={styles.footnote}>
          {nation.ethAddress}
        </Text>
      </PanelView>
    );
  }

  static buildGovernmentalStructureView(nation: NationType) {
    return (
      <PanelView
        style={styles.panelView}
        childrenContainerStyle={styles.noflex}
        title={i18n.t('common.governmentalStructure')}
      >
        <Text style={styles.body}>
          {i18n.t('screens.nationDetails.legalSystemInfo', {
            name: nation.nationName,
            code: nation.nationCode,
          })}
          {' '}
          {i18n.t('screens.nationDetails.lawEnforcementInfo', {
            lawEnforcementMechanism: nation.lawEnforcementMechanism,
          })}
          {' '}
          {i18n.t('screens.nationDetails.governmentInfo', {
            decisionMakingProcess: nation.decisionMakingProcess,
          })}
        </Text>
      </PanelView>
    );
  }

  static buildFactsView(nation: NationType) {
    return (
      <PanelView
        style={styles.panelView}
        childrenContainerStyle={styles.noflex}
        title={i18n.t('screens.nationDetails.funFacts')}
      >
        <Text style={styles.body}>
          {nation.diplomaticRecognition ? (`${i18n.t('screens.nationDetails.diplomaticRecognitionInfo', { name: nation.nationName })}\n\n`) : ''}

          {i18n.t('screens.nationDetails.serviceUsageInfo', {
            allowance: nation.nonCitizenUse ? i18n.t('enums.nation.usageAllowance.may') : i18n.t('enums.nation.usageAllowance.mayNot'),
          })}
          {'\n\n'}

          {i18n.t('screens.nationDetails.profitInfo', {
            profit: nation.profit ? i18n.t('enums.nation.profit.for') : i18n.t('enums.nation.profit.non'),
          })}
        </Text>
      </PanelView>
    );
  }

  static buildStatusPanel(status) {
    return (
      <PanelViewAlert
        status={status}
      />
    );
  }

  static buildCitizenPanel(nation: NationType) {
    if (nation.joined) {
      return (
        <PanelViewCitizen
          nationName={nation.nationName}
        />
      );
    }
    return null;
  }
  static defaultProps: Object;
  buildTabBar() {
    const nation = openedNation(this.props);
    if (nation === null) return null;
    if (this.props.isDraft) {
      return (
        <View style={styles.fakeBottomBar}>

          <NationActionButton
            iconSource={AssetsImage.Actions.delete}
            title={i18n.t('screens.nations.toolbar.delete')}
            disable={false}
            onPress={this.props.deleteDraft}
          />
          <NationActionButton
            iconSource={AssetsImage.Actions.submit}
            title={i18n.t('screens.nations.toolbar.submit')}
            disable={!nationIsValid(nation)}
            onPress={this.props.submitDraft}
          />
        </View>
      );
    }

    return (
      <View style={styles.fakeBottomBar}>
        <NationActionButton
          iconSource={AssetsImage.Actions.chat}
          title={i18n.t('screens.nations.toolbar.chat')}
          disable={false}
          onPress={this.props.openNationChat}
        />
        <NationActionButton
          iconSource={AssetsImage.Actions.map}
          title={i18n.t('screens.nations.toolbar.map')}
          disable
          onPress={() => {}}
        />
        <NationActionButton
          iconSource={AssetsImage.Actions.join}
          title={i18n.t('screens.nations.toolbar.join')}
          disable={NationDetailsScreen.disableJoinButton(nation)}
          onPress={this.props.joinNation}
        />
        <NationActionButton
          iconSource={AssetsImage.Actions.leave}
          title={i18n.t('screens.nations.toolbar.leave')}
          disable={NationDetailsScreen.disableLeaveButton(nation)}
          onPress={this.props.leaveNation}
        />
      </View>
    );
  }
  render() {
    const nation = openedNation(this.props);

    if (!nation) {
      this.props.navigator.pop();
      return <BackgroundImage />;
    }

    const status = resolveStatus(nation);
    const statusDescription = (status !== null ? i18n.ifExists(`screens.nationDetails.statusDescription.${status.key}`) : '');

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={nation.nationName} />

          <ScrollView>
            {statusDescription !== '' && NationDetailsScreen.buildStatusPanel(statusDescription)}

            {NationDetailsScreen.buildAboutView(nation)}
            {NationDetailsScreen.buildCitizenPanel(nation)}
            {NationDetailsScreen.buildGovernmentalStructureView(nation)}
            {NationDetailsScreen.buildFactsView(nation)}
          </ScrollView>
        </View>
        {this.buildTabBar()}
      </View>
    );
  }
}

NationDetailsScreen.defaultProps = {
  joinNation: () => null,
  leaveNation: () => null,
  deleteDraft: () => null,
  submitDraft: () => null,
  openNationChat: () => null,
};

export default NationDetailsScreen;
