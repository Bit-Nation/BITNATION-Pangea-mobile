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
import AssetsImage from '../../../global/assetsImages'
import MessageView from '../../../components/common/MessageView'
import DemoImage from '../../../components/common/DemoImage'
import FakeNavigationBar from '../../../components/common/FakeNavigationBar'
import Strings from '../../../global/Strings'

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
            <MessageView style={[styles.messageView]}>
              <Image source={AssetsImage.Placeholder.map} resizeMode='contain'/>
            </MessageView>
*/}
						
						{/* Fake Achievements Panel */}
						{/*
            <MessageView style={[styles.messageView]}>
              <Image source={AssetsImage.Placeholder.achievements} resizeMode='contain'/>
            </MessageView>
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
				                    title='Chat' disable={true}/>
				<NationActionButton iconSource={AssetsImage.Actions.map}
				                    title='Map' disable={true}/>
				<NationActionButton iconSource={AssetsImage.Actions.join}
				                    title='Join' disable={joined}
				                    onPress={this.props.joinNation}/>
				<NationActionButton iconSource={AssetsImage.Actions.leave}
				                    title='Leave' disable={!joined}
				                    onPress={this.props.leaveNation}/>
			</View>
		)
	}
	
	// Useful Notes:
	// MessageView Props: title = text, messageText = text, style, renderBottom = method, renderAdditionalInfo = method, children = main text of the display
	// DemoImage overlays a message telling user this is a demonstration
	
	_buildAboutView (nation) {
		return (
			<MessageView style={styles.messageView}
			             title={`About ${nation.nationName}`}>
				<Text style={styles.panelSubTitle}>
					Description:
				</Text>
				<Text style={styles.panelBody}>
					{nation.nationDescription ? nation.nationDescription + '\n': ''}
					{nation.nationName} is a{nation.exists
					? ' Geographical '
					: ' Virtual ' + Strings.nation + '\n'}
				</Text>
				<Text style={styles.panelSubTitle}>
					Ethereum Address:
				</Text>
				<Text style={styles.footnote}>
					{nation.ethAddress}
				</Text>
			</MessageView>
		)
	}
	
	_buildGovernmentalStructureView (nation) {
		return (
			<MessageView style={styles.messageView}
			             title='Governmental Structure'>
				<Text style={styles.panelBody}>
					{nation.nationName + ' '}
					uses <Text style={styles.bodyBold}>{nation.nationCode}</Text> as its legal system.
					The laws are enforced with <Text style={styles.bodyBold}>{' ' +
				nation.lawEnforcementMechanism + ' '}</Text>{'. '}
					The government is a <Text style={styles.bodyBold}>{' ' + nation.decisionMakingProcess +
				'. '}</Text>
				</Text>
			</MessageView>
		)
	}
	
	_buildFactsView (nation) {
		return (
			<MessageView style={styles.messageView} title={'Fun Facts'}>
				<Text style={styles.panelBody}>
					{nation.diplomaticRecognition ? nation.nationName + ' is seeking diplomatic recognition from Earth governments as a sovereign entity.\n\n'
							:  ''}
					
					Non-citizens { nation.createNationsNonCitizensMayUseGovernanceServices ? 'may' :  'may not' } use national services.{"\n\n"}
					
					The nation is managed as a {nation.profit ? 'for-profit' : 'non-profit'} entity.
				</Text>
			</MessageView>
		)
	}
	
}


export default NationDetailsScreen
