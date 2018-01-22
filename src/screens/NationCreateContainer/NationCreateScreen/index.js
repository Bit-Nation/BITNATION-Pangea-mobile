/*
	Nation Create Screen
	Version 0.3.1
	
	For usage of ModalDropdown see: https://github.com/sohobloo/react-native-modal-dropdown/blob/master/README.md
 */

import React from 'react'
import {
	View, Image,
	Text, ScrollView, TextInput,
	Picker,
} from 'react-native'

import PropTypes from 'prop-types'
import BackgroundImage from '../../../components/common/BackgroundImage'
import NavigatorComponent from '../../../components/common/NavigatorComponent'
import { ActionSheet } from 'native-base'
import FakeNavigationBar from '../../../components/common/FakeNavigationBar'
import MessageView from '../../../components/common/MessageView'
import SwitchLabeled from '../../../components/common/SwitchLabeled'
import Images from '../../../global/AssetsImages'
import ModalDropdown from 'react-native-modal-dropdown'

import Colors from '../../../global/Colors'
import styles from './styles'

const DONE_BUTTON = 'DONE_BUTTON'

class CreateNation extends NavigatorComponent {
	
	constructor (props) {
		super(props)
		
		this.actionSheet = null
		this._setNavigationButtons(false)

		this.state = {
			nationName: '',
			nationDescription: '',
			exists: false,
			virtualNation: false,
			nationCode: '',
			nationCodeLink: '',
			lawEnforcementMechanism: '',
			profit: false,
			decisionMakingProcess: '',
			diplomaticRecognition: false,
			governanceService: '',
			nonCitizenUse: false,
			agreeFees: false
		}
	}
	
	_setNavigationButtons (saveEnabled) {
		this.props.navigator.setButtons(
			{
				leftButtons: [
					{
						title: 'Cancel',
						id: 'cancel',
						buttonColor: Colors.navigationColor,
					}],
				rightButtons: [
					{
						title: 'Done',
						id: DONE_BUTTON,
						disabled: !saveEnabled,
						buttonColor: Colors.navigationColor,
					}],
			},
		)
	}
	
	onNavBarButtonPress (id) {
		if (id === 'cancel') {
			this.props.navigator.pop()
		}
		if (id === DONE_BUTTON) {
			this.props.onDoneNationCreation(this.state)
		}
	}

	_saveShouldBeEnabled () {
		let enabled = true;
		if (!this.state.nationName || this.state.nationName == '')
			enabled = false;
		enabled = enabled && this.state.agreeFees;
		this._setNavigationButtons(enabled);
	}

	setFieldValue(field, value) {
		this.setState({[field]: value}, this._saveShouldBeEnabled)		
	}
	
	render () {
		return (
			<View style={styles.screenContainer}>
				<BackgroundImage/>
				<FakeNavigationBar/>
				
				<View style={styles.bodyContainer}>
					{/* SCROLLING PANELS FOR DATA ENTRY */}
					<ScrollView style={styles.scrollView}>
						{/* TITLE OF SCREEN */}
						<View style={styles.titleBarLarge}>
							<Text style={styles.largeTitle}>Create a Nation</Text>
						</View>
						
						{this._buildIntroPanel()}
						{this._buildCoreNationView()}
						{this._buildGovernmentalView()}
						{this._buildOptionsView()}
						{this._buildFeesView()}
						{/*{this._buildBottomView()}*/}
					</ScrollView>
				</View>
			</View>
		)
	}
	
	_buildIntroPanel () {
		return (
			<View style={styles.bodyParagraph}>
				<Text style={styles.body}>
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
					sed diam nonummy nibh euismod tincidunt ut laoreet dolore
					magna aliquam erat volutpat.
				</Text>
			</View>
		)
	}
	
	_buildCoreNationView () {
		return (
			<MessageView style={styles.messageView}>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<View style={styles.formRow}>
							<TextInput
								style={styles.textInput}
								placeholder='Name of your Nation'
								placeholderTextColor='rgba(255,255,255,0.3)'
								keyboardType='default'
								onChangeText={(text) => this.setFieldValue('nationName', text)}
        						value={this.state.nationName}
							/>
						</View>
						<View style={styles.formRow}>
							<TextInput
								style={styles.textInput}
								placeholder='Short Description'
								multiline={true}
								numberOfLines={4}
								placeholderTextColor={Colors.placeholderTextColor}
								keyboardType='default'
								onChangeText={(text) => this.setFieldValue('nationDescription', text)}
        						value={this.state.nationDescription}
							/>
						</View>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<ModalDropdown
							style={styles.dropDown}
							textStyle={styles.dropDownTextDefault}
							dropdownTextStyle={styles.dropDownTextList}
							defaultValue={'Choose Nation Location...'}
							options={['Virtual Nation', 'Geographical Nation']}
							onSelect={(index, value) => this.setFieldValue('virtualNation', value === 'Virtual Nation' ? true : false)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label="Nation represents an existing Earth country."
							value={this.state.exists}
							onValueChange={(value) => this.setFieldValue('exists', value)}
						/>
					</View>
				</View>
				
				<Text style={styles.footnote}>
					Virtual nations exist only in Pangea. Geographic nations are
					on Earth.
				</Text>
			</MessageView>
		)
	}
	
	_buildGovernmentalView () {
		return (
			<MessageView style={styles.messageView}
			             title='Governmental Structure' icon=' '>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<ModalDropdown
							style={styles.dropDown}
							textStyle={styles.dropDownTextDefault}
							dropdownTextStyle={styles.dropDownTextList}
							defaultValue={'Legal Code...'}
							options={[
								'None',
								'Transnational/Supranational Law',
								'Multiple Legal Codes',
								'UNIDROIT Principles',
								'Computer Code',
								'Common Law',
								'Civil Law',
							]}
							onSelect={(index, value) => this.setFieldValue('nationCode', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<ModalDropdown
							style={styles.dropDown}
							textStyle={styles.dropDownTextDefault}
							dropdownTextStyle={styles.dropDownTextList}
							defaultValue={'Law Enforcement Mechanism...'}
							options={[
								'No Law Enforcement',
								'ID & Reputation Law Enforcement',
								'Private or Cooperative Security',
								'Nation State Law Enforcement',
								'International Law Enforcement']}
							onSelect={(index, value) => this.setFieldValue('lawEnforcementMechanism', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<ModalDropdown
							style={styles.dropDown}
							textStyle={styles.dropDownTextDefault}
							dropdownTextStyle={styles.dropDownTextList}
							defaultValue={'Type of Government...'}
							options={[
								'Other Type of Government',
								'Holocracy',
								'Democracy',
								'Autocracy',
								'Meritocracy',
								'Theocracy',
							]}
							onSelect={(index, value) => this.setFieldValue('decisionMakingProcess', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<ModalDropdown
							style={styles.dropDown}
							textStyle={styles.dropDownTextDefault}
							dropdownTextStyle={styles.dropDownTextList}
							defaultValue={'Services Offered...'}
							options={[
								'Legal Services',
								'Insurance Services',
								'Social Services',
								'Security Services',
								'Diplomatic Services',
								'Physical Residency',
							]}
							onSelect={(index, value) => this.setFieldValue('governanceService', value)}
						/>
					</View>
				</View>
				<Text style={styles.footnote}>
					Here is some text. Here is some text. Here is some text.
					Here is some text. Here is some text. Here is some text.
					Here is some text. Here is some text.
				</Text>
			</MessageView>
		)
	}
	
	_buildOptionsView () {
		return (
			<MessageView style={styles.messageView} title='Options' icon=' '>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label="Seeking diplomatic recognition as a sovereign entity."
							value={this.state.diplomaticRecognition}
							onValueChange={(value) => this.setFieldValue('diplomaticRecognition', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label="Non-citizens may use governance services."
							value={this.state.nonCitizenUse}
							onValueChange={(value) => this.setFieldValue('nonCitizenUse', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label="For-profit nation"
							value={this.state.profit}
							onValueChange={(value) => this.setFieldValue('profit', value)}
						/>
					</View>
				</View>
			</MessageView>
		)
	}
	
	_buildFeesView () {
		return (
			<MessageView style={styles.messageView} title='Fees' icon=' '>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label="I agree to pay 1.232 mETH to create this nation."
							value={this.state.agreeFees}
							onValueChange={(value) => this.setFieldValue('agreeFees', value)}
						/>
					</View>
				</View>
				<Text style={styles.footnote}>
					The fee to register a new nation on the blockchain is 1.00
					mETH. We will deduct the fee from your wallet. You have 1.2
					ETH in your wallet.
				</Text>
			</MessageView>
		)
	}
	
	_buildBottomView () {
		return (
			<View style={styles.nationsScreenImageContainer}>
				<Image
					style={styles.secondImageContainer}
					source={Images.logo}
					resizeMode="contain"
				/>
			</View>
		)
	}
}

CreateNation.propTypes = {
	onCancelNationCreation: PropTypes.func.isRequired,
	onDoneNationCreation: PropTypes.func.isRequired,
}

export default CreateNation