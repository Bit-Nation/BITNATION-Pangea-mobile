/*
	Nation Create Screen
	Version 0.3.1
	
	For usage of ModalDropdown see: https://github.com/sohobloo/react-native-modal-dropdown/blob/master/README.md

	For usage of MultiSelect see: https://github.com/toystars/react-native-multiple-select (We are using a custom UI version)
 */

import React from 'react'
import {
	View, Image,
	Text, ScrollView, TextInput,
} from 'react-native'

import PropTypes from 'prop-types'
import BackgroundImage from '../../../components/common/BackgroundImage'
import NavigatorComponent from '../../../components/common/NavigatorComponent'
import { ActionSheet } from 'native-base'
import FakeNavigationBar from '../../../components/common/FakeNavigationBar'
import MessageView from '../../../components/common/MessageView'
import SwitchLabeled from '../../../components/common/SwitchLabeled'
import MultiSelect from '../../../components/MultiSelect'
import Images from '../../../global/AssetsImages'
import ModalDropdown from 'react-native-modal-dropdown'

import Colors from '../../../global/Colors'
import Strings from '../../../global/Strings'

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
			agreeFees: false,
			selectedServicesItems: [],
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
			this.props.navigator.dismissModal()
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
							<Text style={styles.largeTitle}>{Strings.createNationTitle}</Text>
						</View>

            {/* CONSTRUCTIONS OF THE SECTIONS IN THE SCREEN */}
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
					{Strings.createNationIntroText}
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
								placeholder={Strings.createNationNationNamePrompt}
								placeholderTextColor={Colors.placeholderTextColor}
								keyboardType='default'
								onChangeText={(text) => this.setFieldValue('nationName', text)}
        						value={this.state.nationName}
							/>
						</View>
						<View style={styles.formRow}>
							<TextInput
								style={styles.textInput}
								placeholder={Strings.createNationShortDescPrompt}
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
							textStyle={styles.placeHolderText}
							dropdownTextStyle={styles.dropDownTextList}
							defaultValue={Strings.createNationLocationPrompt}
							options={[Strings.virtualNationTrue, Strings.virtualNationFalse]}
							onSelect={(index, value) => this.setFieldValue('virtualNation', value === 'Virtual Nation' ? true : false)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={Strings.createNationRepresentsPrompt}
							value={this.state.exists}
							onValueChange={(value) => this.setFieldValue('exists', value)}
						/>
					</View>
				</View>
				
				<Text style={styles.footnote}>
					{Strings.createNationCoreFootnote}
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
						{/*
						<ModalDropdown
							style={styles.dropDown}
							textStyle={styles.dropDownTextDefault}
							dropdownTextStyle={styles.dropDownTextList}
							defaultValue={'Legal Code...'}
							options={[
								Strings.createNationNoLegalCode,
								Strings.legalCodeTransSupra,
								Strings.legalCodeMultiple,
								Strings.legalCodeUNIDROIT,
								Strings.legalCodeComputer,
								Strings.legalCodeCommon,
								Strings.legalCodeCivil,
							]}
							onSelect={(index, value) => this.setFieldValue('nationCode', value)}
						/> */}
            <MultiSelect
							single
              hideTags
              items={[{
                id: 'No legal code',
                name: 'No legal code',
              }, {
                id: 'Transnational/Supranational Law',
                name: 'Transnational/Supranational Law',
              }, {
                id: 'Multiple Legal Codes',
                name: 'Multiple Legal Codes',
              }, {
                id: 'UNIDROIT Principles',
                name: 'UNIDROIT Principles',
              }]}
              uniqueKey="idLegalCode"
              onSelectedItemsChange={(index, value) => this.setFieldValue('selectedServicesItems', value)}
              selectedItems={this.state.selectedServicesItems}
              selectText="Legal Code..."
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText="Submit"
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						{/*
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
						/> */}
            <MultiSelect
              single
              hideTags
              items={[{
                id: 'No Law Enforcement',
                name: 'No Law Enforcement',
              }, {
                id: 'ID & Reputation Law Enforcement',
                name: 'ID & Reputation Law Enforcement',
              }, {
                id: 'Private or Cooperative Security',
                name: 'Private or Cooperative Security',
              }, {
                id: 'Nation State Law Enforcement',
                name: 'Nation State Law Enforcement',
              }, {
                id: 'International Law Enforcement',
                name: 'International Law Enforcement',
              }]}
              uniqueKey="idEnforcement"
              onSelectedItemsChange={(index, value) => this.setFieldValue('selectedServicesItems', value)}
              selectedItems={this.state.selectedServicesItems}
              selectText="Law Enforcement Mechanism..."
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText="Submit"
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						{/*
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
						/> */}
            <MultiSelect
              single
              hideTags
              items={[{
                id: 'Other Type of Government',
                name: 'Other Type of Government',
              }, {
                id: 'Holocracy',
                name: 'Holocracy',
              }, {
                id: 'Democracy',
                name: 'Democracy',
              }, {
                id: 'Autocracy',
                name: 'Autocracy',
              }, {
                id: 'Meritocracy',
                name: 'Meritocracy',
              }, {
                id: 'Theocracy',
                name: 'Theocracy',
              }]}
              uniqueKey="idTypeGov"
              onSelectedItemsChange={(index, value) => this.setFieldValue('selectedServicesItems', value)}
              selectedItems={this.state.selectedServicesItems}
              selectText="Type of Government..."
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText="Submit"
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
              hideTags
              items={[{
                id: 'Legal Services',
                name: 'Legal Services',
              }, {
                id: 'Insurance Services',
                name: 'Insurance Services',
              }, {
                id: 'Social Services',
                name: 'Social Services',
              }, {
                id: 'Diplomatic Services',
                name: 'Diplomatic Services',
              }, {
                id: 'Physical Services',
                name: 'Physical Services',
              }]}
              uniqueKey="idLegalServices"
              ref={(component) => this.multiSelect = component }
              onSelectedItemsChange={(index, value) => this.setFieldValue('selectedServicesItems', value)}
              selectedItems={this.state.selectedServicesItems}
              selectText="Services Offered..."
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText="Submit"
            />
					</View>
				</View>
				<Text style={styles.footnote}>
					{Strings.governmentalStructureFootnote}
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
							label={'I agree to pay ' + Strings.showCurrency('ETH', 0.001, true) + ' to create this nation.'}
							value={this.state.agreeFees}
							onValueChange={(value) => this.setFieldValue('agreeFees', value)}
						/>
					</View>
				</View>
				<Text style={styles.footnote}>
					We will deduct the fee from your wallet. You have {Strings.showCurrency('ETH', 1.22, true)} in your wallet.
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