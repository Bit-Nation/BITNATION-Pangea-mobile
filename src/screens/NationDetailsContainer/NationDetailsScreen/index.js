import React, { Component } from 'react'
import {
  View,
  Text, ScrollView, Image, StatusBar, Alert,
} from 'react-native';
import PropTypes from 'prop-types'

import BackgroundImage from '../../../components/common/BackgroundImage'
import styles from './styles'
import { resolveNation } from '../../../utils/nations'
import NationActionButton from '../../../components/common/NationActionButton'
import AssetsImage from '../../../global/AssetsImages'
import PanelView from '../../../components/common/PanelView'
import DemoImage from '../../../components/common/DemoImage'
import FakeNavigationBar from '../../../components/common/FakeNavigationBar'
import i18n from '../../../global/i18n';

class NationDetailsScreen extends Component {

	render () {
		const nation = resolveNation(this.props.nations,
			this.props.openedNationId)

		if (!nation) {
			return <BackgroundImage/>
		}

		return (
			<View style={styles.screenContainer}>
				<BackgroundImage/>
				<FakeNavigationBar navBarHidden=''/>
				<View style={styles.layoutMargin}>
					<View style={styles.titleBarLarge}>
						<Text
							style={styles.largeTitle}>{nation.nationName}</Text>
						{console.log('joined nation: ', nation.joined)}
					</View>
				</View>
				{this._buildTabBar(nation.joined)}
				<View style={styles.bodyContainer}>
					<ScrollView style={styles.scrollView}>
						{/* Fake Map panel */}
						{/*
            <PanelView style={[styles.messageView]}>
              <Image source={AssetsImage.Placeholder.map} resizeMode='contain'/>
            </PanelView>
*/}

						{/* Fake Achievements Panel */}
						{/*
            <PanelView style={[styles.messageView]}>
              <Image source={AssetsImage.Placeholder.achievements} resizeMode='contain'/>
            </PanelView>
*/}
						{this._buildAboutView(nation)}
						{this._buildGovernmentalStructureView(nation)}
						{this._buildFactsView(nation)}
					</ScrollView>
				</View>
			</View>
		)
	}

	_buildTabBar (joined) {
		return (
			<View style={styles.tabBar}>
				<NationActionButton iconSource={AssetsImage.Actions.chat}
				                    title={i18n.t('screens.nationDetails.chatButton')} disable={true}/>
				<NationActionButton iconSource={AssetsImage.Actions.map}
				                    title={i18n.t('screens.nationDetails.mapButton')} disable={true}/>
				<NationActionButton iconSource={AssetsImage.Actions.join}
				                    title={i18n.t('screens.nationDetails.joinButton')} disable={joined}
				                    onPress={this.props.joinNation}/>
				<NationActionButton iconSource={AssetsImage.Actions.leave}
				                    title={i18n.t('screens.nationDetails.leaveButton')} disable={!joined}
				                    onPress={this.props.leaveNation}/>
			</View>
		)
	}

	// Useful Notes:
	// PanelView Props: title = text, messageText = text, style, renderBottom = method, renderAdditionalInfo = method, children = main text of the display
	// DemoImage overlays a message telling user this is a demonstration

	_buildAboutView (nation) {
		return (
			<PanelView style={styles.messageView}
			             title={i18n.t('screens.nationDetails.aboutInfo', { name: nation.nationName })}>
				<Text style={styles.panelSubTitle}>
					Description:
				</Text>
				<Text style={styles.panelBody}>
					{nation.nationDescription ? nation.nationDescription + '\n': ''}
					{i18n.t('screens.nationDetails.locationInfo', {
						name: nation.nationName,
						locationType: nation.exists ?
							i18n.t('enums.nation.locationType.geographical') :
              i18n.t('enums.nation.locationType.virtual')
					}) + '\n'}
				</Text>
				<Text style={styles.panelSubTitle}>
					{i18n.t('screens.nationDetails.ethereumAddress')}
				</Text>
				<Text style={styles.footnote}>
					{nation.ethAddress}
				</Text>
			</PanelView>
		)
	}

	_buildGovernmentalStructureView (nation) {
		return (
			<PanelView style={styles.messageView}
			             title={i18n.t('common.governmentalStructure')}>
				<Text style={styles.panelBody}>
          {i18n.t('screens.nationDetails.legalSystemInfo', {
          	name: nation.nationName,
            code: nation.nationCode
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
		)
	}

	_buildFactsView (nation) {
		return (
			<PanelView style={styles.messageView} title={i18n.t('screens.nationDetails.funFacts')}>
				<Text style={styles.panelBody}>
					{nation.diplomaticRecognition ? (i18n.t('screens.nationDetails.diplomaticRecognitionInfo', { name: nation.nationName }) + '\n\n') : ''}

          {i18n.t('screens.nationDetails.serviceUsageInfo', {
            allowance: nation.createNationsNonCitizensMayUseGovernanceServices ? i18n.t('enums.nation.usageAllowance.may') : i18n.t('enums.nation.usageAllowance.mayNot')
          })}
					{'\n\n'}

          {i18n.t('screens.nationDetails.profitInfo', {
            profit: nation.profit ? i18n.t('enums.nation.profit.for') : i18n.t('enums.nation.profit.non')
          })}
				</Text>
			</PanelView>
		)
	}

}


export default NationDetailsScreen
