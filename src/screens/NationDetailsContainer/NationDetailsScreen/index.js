import React, { Component } from 'react';
import {
  View,
  Text, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import NationActionButton from '../../../components/common/NationActionButton';
import AssetsImage from '../../../global/AssetsImages';
import PanelView from '../../../components/common/PanelView';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import { openedNation } from '../../../reducers/nations';
import PanelViewAlert from '../../../components/common/PanelViewAlert';
import PanelViewCitizen from '../../../components/common/PanelViewCitizen';
import { nationIsValid, resolveStatus } from '../../../utils/nations';

class NationDetailsScreen extends Component {
  static disableJoinButton(nation) {
    if (nation.tx && nation.tx.status === 200) {
      return true;
    }

    if (nation.joined === true) {
      return true;
    }

    return false;
  }

  static disableLeaveButton(nation) {
    if (nation.tx && nation.tx.status === 200) {
      return true;
    }

    if (nation.joined === false) {
      return true;
    }

    return false;
  }

  static buildAboutView(nation) {
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

  static buildGovernmentalStructureView(nation) {
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

  static buildFactsView(nation) {
    return (
      <PanelView
        style={styles.panelView}
        childrenContainerStyle={styles.noflex}
        title={i18n.t('screens.nationDetails.funFacts')}
      >
        <Text style={styles.body}>
          {nation.diplomaticRecognition ? (`${i18n.t('screens.nationDetails.diplomaticRecognitionInfo', { name: nation.nationName })}\n\n`) : ''}

          {i18n.t('screens.nationDetails.serviceUsageInfo', {
            allowance: nation.createNationsNonCitizensMayUseGovernanceServices ? i18n.t('enums.nation.usageAllowance.may') : i18n.t('enums.nation.usageAllowance.mayNot'),
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

  static buildCitizenPanel(nation) {
    if (nation.joined) {
      return (
        <PanelViewCitizen
          nationName={nation.nationName}
        />
      );
    }
    return false;
  }

  buildTabBar() {
    const nation = openedNation(this.props);

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
        />
        <NationActionButton
          iconSource={AssetsImage.Actions.join}
          title={i18n.t('screens.nations.toolbar.join')}
          disable={this.disableJoinButton(nation)}
          onPress={this.props.joinNation}
        />
        <NationActionButton
          iconSource={AssetsImage.Actions.leave}
          title={i18n.t('screens.nations.toolbar.leave')}
          disable={this.disableLeaveButton(nation)}
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
        <FakeNavigationBar navBarHidden='' />
        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.titleBarLarge}>
              <Text style={styles.largeTitle}>{nation.nationName}</Text>
            </View>
          </View>

          <ScrollView>
            {statusDescription !== '' && this.buildStatusPanel(statusDescription)}

            {this.buildAboutView(nation)}
            {this.buildCitizenPanel(nation)}
            {this.buildGovernmentalStructureView(nation)}
            {this.buildFactsView(nation)}
          </ScrollView>
        </View>
        {this.buildTabBar()}
      </View>
    );
  }
}

NationDetailsScreen.propTypes = {
  navigator: PropTypes.shape({ pop: {} }),
  isDraft: PropTypes.bool,
  joinNation: PropTypes.func,
  leaveNation: PropTypes.func,
  deleteDraft: PropTypes.func,
  submitDraft: PropTypes.func,
  openNationChat: PropTypes.func,
};

NationDetailsScreen.defaultProps = {
  navigator: null,
  isDraft: null,
  joinNation: () => null,
  leaveNation: () => null,
  deleteDraft: () => null,
  submitDraft: () => null,
  openNationChat: () => null,
};

export default NationDetailsScreen;
