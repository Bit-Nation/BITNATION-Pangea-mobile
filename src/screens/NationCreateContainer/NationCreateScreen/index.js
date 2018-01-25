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
import Loading from '../../../components/common/Loading';
import ModalDropdown from 'react-native-modal-dropdown'

import Colors from '../../../global/Colors'
import Strings from '../../../global/Strings'

import styles from './styles'


const DONE_BUTTON = 'DONE_BUTTON'

class CreateNation extends NavigatorComponent {
	
	constructor (props) {
		super(props)
		
		this.actionSheet = null
		this.multiGovernanceService = null
		this._setNavigationButtons(false)

		this.state = {
			nationName: '',
			nationDescription: '',
			exists: false,
			virtualNation: [Strings.virtualNationFalse],
			nationCode: [],
			nationCodeLink: '',
			lawEnforcementMechanism: [],
			profit: false,
			decisionMakingProcess: [],
			diplomaticRecognition: false,
			governanceService: [],
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
						buttonColor: Colors.navigationButtonColor,
					}],
				rightButtons: [
					{
						title: 'Done',
						id: DONE_BUTTON,
						disabled: !saveEnabled,
						buttonColor: Colors.navigationButtonColor,
					}],
			},
		)
	}
	
	onNavBarButtonPress (id) {
		if (id === 'cancel') {
			this.props.navigator.dismissModal()
		}
		if (id === DONE_BUTTON) {
			let nation = {
				nationName: this.state.nationName.trim(),
				nationDescription: this.state.nationDescription.trim(),
				exists: this.state.exists,
				virtualNation: this.state.virtualNation[0] == Strings.virtualNationTrue ? true : false,
				nationCode: this.state.nationCode.join(', '),
				nationCodeLink: this.state.nationCodeLink,
				lawEnforcementMechanism: this.state.lawEnforcementMechanism.join(', '),
				profit: this.state.profit,
				decisionMakingProcess: this.state.decisionMakingProcess.join(', '),
				diplomaticRecognition: this.state.diplomaticRecognition,
				governanceService: this.state.governanceService.join(', '),
				nonCitizenUse: this.state.nonCitizenUse
			}
			this.props.onCreateNation(nation, this.props.navigator)
		}
	}

	_saveShouldBeEnabled () {
		let enabled = true;
		if (!this.state.nationName || this.state.nationName == '')
			enabled = false;
		{/* enabled = enabled && this.state.agreeFees;  */}
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
						{/* {this._buildFeesView()} */}
						{/*{this._buildBottomView()}*/}
					</ScrollView>
				</View>
				{this.props.inProgress ? <Loading/> : null}
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
            <MultiSelect
              single
              hideTags
              items={[{
                id: Strings.virtualNationTrue,
                name: Strings.virtualNationTrue,
              }, {
                id: Strings.virtualNationFalse,
                name: Strings.virtualNationFalse,
              }]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('virtualNation', selectedItems)}
              selectedItems={this.state.virtualNation}
              selectText={Strings.createNationLocationPrompt}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={Strings.ok}
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
			             title={Strings.createNationGovernmentalStructure} icon=' '>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
							single
              hideTags
              items={[{
                id: Strings.createNationNoLegalCode,
                name: Strings.createNationNoLegalCode,
              }, {
                id: Strings.legalCodeTransSupra,
                name: Strings.legalCodeTransSupra,
              }, {
                id: Strings.legalCodeMultiple,
                name: Strings.legalCodeMultiple,
              }, {
                id: Strings.legalCodeUNIDROIT,
                name: Strings.legalCodeUNIDROIT,
              }, {
                id: Strings.legalCodeComputer,
                name: Strings.legalCodeComputer,
              }, {
                id: Strings.legalCodeCommon,
                name: Strings.legalCodeCommon,
              }, {
                id: Strings.legalCodeCivil,
                name: Strings.legalCodeCivil,
              }]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('nationCode', selectedItems)}
              selectedItems={this.state.nationCode}
              selectText={Strings.createNationLegalCode}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={Strings.ok}
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
              single
              hideTags
              items={[{
                id: Strings.createNationNoLawEnforcement,
                name: Strings.createNationNoLawEnforcement,
              }, {
                id: Strings.createNationIDReputationLawEnforcement,
                name: Strings.createNationIDReputationLawEnforcement,
              }, {
                id: Strings.createNationPrivateOrCooperativeSecurity,
                name: Strings.createNationPrivateOrCooperativeSecurity,
              }, {
                id: Strings.createNationNationStateLawEnforcement,
                name: Strings.createNationNationStateLawEnforcement,
              }, {
                id: Strings.createNationInternationalLawEnforcement,
                name: Strings.createNationInternationalLawEnforcement,
              }]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('lawEnforcementMechanism', selectedItems)}
              selectedItems={this.state.lawEnforcementMechanism}
              selectText={Strings.createNationLawEnforcementMechanism}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={Strings.ok}
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
              single
              hideTags
              items={[{
                id: Strings.createNationOtherTypeOfGovernment,
                name: Strings.createNationOtherTypeOfGovernment,
              }, {
                id: Strings.createNationHolocracy,
                name: Strings.createNationHolocracy,
              }, {
                id: Strings.createNationDemocracy,
                name: Strings.createNationDemocracy,
              }, {
                id: Strings.createNationAutocracy,
                name: Strings.createNationAutocracy,
              }, {
                id: Strings.createNationMeritocracy,
                name: Strings.createNationMeritocracy,
              }, {
                id: Strings.createNationTheocracy,
                name: Strings.createNationTheocracy,
              }]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('decisionMakingProcess', selectedItems)}
              selectedItems={this.state.decisionMakingProcess}
              selectText={Strings.createNationTypeOfGovernment}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={Strings.ok}
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
              hideTags
              items={[{
                id: Strings.createNationsLegalServices,
                name: Strings.createNationsLegalServices,
              }, {
                id: Strings.createNationsInsuranceServices,
                name: Strings.createNationsInsuranceServices,
              }, {
                id: Strings.createNationsSocialServices,
                name: Strings.createNationsSocialServices,
              }, {
                id: Strings.createNationsDiplomaticServices,
                name: Strings.createNationsDiplomaticServices,
              }, {
                id: Strings.createNationsPhysicalServices,
                name: Strings.createNationsPhysicalServices,
              }]}
              uniqueKey="id"
              ref={(component) => this.multiGovernanceService = component}
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('governanceService', selectedItems)}
              selectedItems={this.state.governanceService}
              selectText={Strings.createNationsServicesOffered}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={Strings.ok}
            />
            <View>
              {this.multiGovernanceService && this.multiGovernanceService.getSelectedItemsExt(this.state.governanceService)}
            </View>
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
			<MessageView style={styles.messageView} title={Strings.options} icon=' '>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={Strings.createNationsSeekingDiplomaticRecognition}
							value={this.state.diplomaticRecognition}
							onValueChange={(value) => this.setFieldValue('diplomaticRecognition', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={Strings.createNationsNonCitizensMayUseGovernanceServices}
							value={this.state.nonCitizenUse}
							onValueChange={(value) => this.setFieldValue('nonCitizenUse', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={Strings.createNationForProfitNation}
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
			<MessageView style={styles.messageView} title={Strings.fees} icon=' '>
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
	onCreateNation: PropTypes.func.isRequired,
}

export default CreateNation