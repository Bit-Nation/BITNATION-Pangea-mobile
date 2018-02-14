import React, { Component } from 'react';
import {
  View,
  Text, ScrollView, Image, StatusBar, Alert,
} from 'react-native';
import PropTypes from 'prop-types';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import NationActionButton from '../../../components/common/NationActionButton';
import AssetsImage from '../../../global/AssetsImages';
import PanelView from '../../../components/common/PanelView';
import DemoImage from '../../../components/common/DemoImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import Colors from '../../../global/colors';
import { screen } from '../../../global/Screens';
import { openedNation } from '../../../reducers/nations';
import { nationIsValid } from '../../../utils/nations';

class NationDetailsScreen extends Component {

  render() {
    const nation = openedNation(this.props);

    if (!nation) {
      return <BackgroundImage/>;
    }

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar navBarHidden=''/>
        <View style={styles.bodyContainer}>
          {/* TITLE OF SCREEN */}
          <View style={styles.titleContainer}>
            <View style={styles.titleBarLarge}>
              <Text style={styles.largeTitle}>{nation.nationName}</Text>
              {console.log('joined nation: ', nation.joined)}
            </View>
          </View>

          <ScrollView>
            {this._buildAboutView(nation)}
            {this._buildGovernmentalStructureView(nation)}
            {this._buildFactsView(nation)}
          </ScrollView>
        </View>
        {this._buildTabBar(nation.joined, nation.idInSmartContract >= 0)}
      </View>
    );
  }

  _buildTabBar(joined, created) {
    const nation = openedNation(this.props);

    if (this.props.isDraft) {
      return (
        <View style={styles.fakeBottomBar}>
          <NationActionButton iconSource={AssetsImage.Actions.chat}
                              title={i18n.t('screens.createNation.delete')}
                              disable={false}
                              onPress={this.props.deleteDraft}/>
          <NationActionButton iconSource={AssetsImage.Actions.map}
                              title={i18n.t('screens.createNation.submit')}
                              disable={!nationIsValid(nation)}
                              onPress={this.props.submitDraft}/>
        </View>
      );
    } else {
      return (
        <View style={styles.fakeBottomBar}>
          <NationActionButton iconSource={AssetsImage.Actions.chat}
                              title={i18n.t('screens.nationDetails.chatButton')} disable={true}/>
          <NationActionButton iconSource={AssetsImage.Actions.map}
                              title={i18n.t('screens.nationDetails.mapButton')} disable={true}/>
          <NationActionButton iconSource={AssetsImage.Actions.join}
                              title={i18n.t('screens.nationDetails.joinButton')} disable={joined || !created}
                              onPress={this.props.joinNation}/>
          <NationActionButton iconSource={AssetsImage.Actions.leave}
                              title={i18n.t('screens.nationDetails.leaveButton')} disable={!joined}
                              onPress={this.props.leaveNation}/>
        </View>
      );
    }
  }

  // Useful Notes:
  // PanelView Props: title = text, messageText = text, style, renderBottom = method, renderAdditionalInfo = method, children = main text of the display
  // DemoImage overlays a message telling user this is a demonstration

  _buildAboutView(nation) {
    return (
      <PanelView style={styles.panelView}
                 childrenContainerStyle={{ flex: 0, }}
                 title={i18n.t('screens.nationDetails.aboutInfo', { name: nation.nationName })}>
        <Text style={styles.panelSubTitle}>
          {i18n.t('screens.nationDetails.description') + ':'}
        </Text>
        <Text style={styles.body}>
          {nation.nationDescription ? nation.nationDescription + '\n' : ''}
          {i18n.t('screens.nationDetails.locationInfo', {
            name: nation.nationName,
            locationType: nation.exists ?
              i18n.t('enums.nation.locationType.geographical') :
              i18n.t('enums.nation.locationType.virtual'),
          }) + '\n'}
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

  _buildGovernmentalStructureView(nation) {
    return (
      <PanelView style={styles.panelView}
                 childrenContainerStyle={{ flex: 0, }}
                 title={i18n.t('common.governmentalStructure')}>
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

  _buildFactsView(nation) {
    return (
      <PanelView style={styles.panelView}
                 childrenContainerStyle={{ flex: 0, }}
                 title={i18n.t('screens.nationDetails.funFacts')}>
        <Text style={styles.body}>
          {nation.diplomaticRecognition ? (i18n.t('screens.nationDetails.diplomaticRecognitionInfo', { name: nation.nationName }) + '\n\n') : ''}

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

}

NationDetailsScreen.propTypes = {
  isDraft: PropTypes.bool,
  joinNation: PropTypes.func,
  leaveNation: PropTypes.func,
  deleteDraft: PropTypes.func,
  submitDraft: PropTypes.func,
};

export default NationDetailsScreen;
