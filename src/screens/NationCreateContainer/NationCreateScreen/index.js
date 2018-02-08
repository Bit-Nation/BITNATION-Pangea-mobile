/*
	Nation Create Screen
	Version 0.3.1

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
import PanelView from '../../../components/common/PanelView'
import SwitchLabeled from '../../../components/common/SwitchLabeled'
import MultiSelect from '../../../components/MultiSelect'
import Images from '../../../global/AssetsImages'
import Loading from '../../../components/common/Loading';

import Colors from '../../../global/Colors'
import styles from './styles'
import i18n from '../../../global/i18n';
import GlobalStyles from "../../../global/Styles";
import {MediaQueryStyleSheet} from "react-native-responsive";
import NationActionButton from '../../../components/common/NationActionButton'
import AssetsImage from '../../../global/AssetsImages'

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
			virtualNation: [i18n.t('enums.nation.locationType.geographical')],
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
						title: i18n.t('screens.createNation.cancelButton'),
						id: 'cancel',
						buttonColor: Colors.navigationButtonColor,
					}],
				rightButtons: [],
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
				virtualNation: this.state.virtualNation[0] === i18n.t('enums.nation.locationType.geographical'),
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
		if (!this.state.nationDescription || this.state.nationDescription == '')
			enabled = false;
		if (!this.state.virtualNation || !this.state.virtualNation.length > 0)
			enabled = false;
		if (!this.state.nationCode || !this.state.nationCode.length > 0)
			enabled = false;
		if (!this.state.lawEnforcementMechanism || !this.state.lawEnforcementMechanism.length > 0)
			enabled = false;
		if (!this.state.decisionMakingProcess || !this.state.decisionMakingProcess.length > 0)
			enabled = false;
		if (!this.state.governanceService || !this.state.governanceService.length > 0)
			enabled = false;
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
							<Text style={styles.largeTitle}>{i18n.t('screens.createNation.title')}</Text>
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
        {this._buildBottomBar()}
				{this.props.inProgress ? <Loading/> : null}
			</View>
		)
	}

// * New fake bottom Tab Bar / 0.3.2 Sprint design
	_buildBottomBar() {
		return (
			<View style={ styles.fakeBottomBar }>
        <NationActionButton iconSource={AssetsImage.Actions.chat}
                            title={i18n.t('screens.createNation.reset')} disable={false}
                            onPress={this.props.onResetNation}/>
        <NationActionButton iconSource={AssetsImage.Actions.chat}
                            title={i18n.t('screens.createNation.save')} disable={false}/>
        <NationActionButton iconSource={AssetsImage.Actions.chat}
                            title={i18n.t('screens.createNation.delete')} disable={false}/>
        <NationActionButton iconSource={AssetsImage.Actions.chat}
                            title={i18n.t('screens.createNation.submit')} disable={false}/>
			</View>
		)
	}
	
	_buildIntroPanel () {
		return (
			<View style={styles.bodyParagraph}>
				<Text style={styles.body}>
          {i18n.t('screens.createNation.introduction')}
				</Text>
			</View>
		)
	}
	
	_buildCoreNationView () {
		return (
			<PanelView style={styles.messageView}>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<View style={styles.formRow}>
							<TextInput
								style={styles.textInput}
								placeholder={i18n.t('screens.createNation.prompt.name')}
								placeholderTextColor={Colors.placeholderTextColor}
								keyboardType='default'
								onChangeText={(text) => this.setFieldValue('nationName', text)}
        						value={this.state.nationName}
							/>
						</View>
						<View style={styles.formRow}>
							<TextInput
								style={styles.textInput}
								placeholder={i18n.t('screens.createNation.prompt.description')}
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
                id: i18n.t('enums.nation.locationType.virtual'),
                name: i18n.t('enums.nation.locationType.virtual'),
              }, {
                id: i18n.t('enums.nation.locationType.geographical'),
                name: i18n.t('enums.nation.locationType.geographical'),
              }]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('virtualNation', selectedItems)}
              selectedItems={this.state.virtualNation}
              selectText={i18n.t('screens.createNation.prompt.location')}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={i18n.t('screens.createNation.prompt.represents')}
							value={this.state.exists}
							onValueChange={(value) => this.setFieldValue('exists', value)}
						/>
					</View>
				</View>
				
				<Text style={styles.footnote}>
					{i18n.t('screens.createNation.locationTypeHint')}
				</Text>
			</PanelView>
		)
	}
	
	_buildGovernmentalView () {
		return (
			<PanelView style={styles.messageView}
			             title={i18n.t('common.governmentalStructure')} icon=' '>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
							single
              hideTags
              items={[{
                id: i18n.t('enums.nation.legalCode.no'),
                name: i18n.t('enums.nation.legalCode.no'),
              }, {
                id: i18n.t('enums.nation.legalCode.transSupra'),
                name: i18n.t('enums.nation.legalCode.transSupra'),
              }, {
                id: i18n.t('enums.nation.legalCode.multiple'),
                name: i18n.t('enums.nation.legalCode.multiple'),
              }, {
                id: i18n.t('enums.nation.legalCode.unidroit'),
                name: i18n.t('enums.nation.legalCode.unidroit'),
              }, {
                id: i18n.t('enums.nation.legalCode.computer'),
                name: i18n.t('enums.nation.legalCode.computer'),
              }, {
                id: i18n.t('enums.nation.legalCode.common'),
                name: i18n.t('enums.nation.legalCode.common'),
              }, {
                id: i18n.t('enums.nation.legalCode.civil'),
                name: i18n.t('enums.nation.legalCode.civil'),
              }]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('nationCode', selectedItems)}
              selectedItems={this.state.nationCode}
              selectText={i18n.t('screens.createNation.prompt.legalCode')}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
              single
              hideTags
              items={[{
                id: i18n.t('enums.nation.lawEnforcementMechanism.no'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.no'),
              }, {
                id: i18n.t('enums.nation.lawEnforcementMechanism.idReputation'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.idReputation'),
              }, {
                id: i18n.t('enums.nation.lawEnforcementMechanism.privateOrCooperativeSecurity'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.privateOrCooperativeSecurity'),
              }, {
                id: i18n.t('enums.nation.lawEnforcementMechanism.nationState'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.nationState'),
              }, {
                id: i18n.t('enums.nation.lawEnforcementMechanism.international'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.international'),
              }]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('lawEnforcementMechanism', selectedItems)}
              selectedItems={this.state.lawEnforcementMechanism}
              selectText={i18n.t('screens.createNation.prompt.lawEnforcementMechanism')}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
              single
              hideTags
              items={[{
                id: i18n.t('enums.nation.governmentType.other'),
                name: i18n.t('enums.nation.governmentType.other'),
              }, {
                id: i18n.t('enums.nation.governmentType.holocracy'),
                name: i18n.t('enums.nation.governmentType.holocracy'),
              }, {
                id: i18n.t('enums.nation.governmentType.democracy'),
                name: i18n.t('enums.nation.governmentType.democracy'),
              }, {
                id: i18n.t('enums.nation.governmentType.autocracy'),
                name: i18n.t('enums.nation.governmentType.autocracy'),
              }, {
                id: i18n.t('enums.nation.governmentType.meritocracy'),
                name: i18n.t('enums.nation.governmentType.meritocracy'),
              }, {
                id: i18n.t('enums.nation.governmentType.theocracy'),
                name: i18n.t('enums.nation.governmentType.theocracy'),
              }]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('decisionMakingProcess', selectedItems)}
              selectedItems={this.state.decisionMakingProcess}
              selectText={i18n.t('screens.createNation.prompt.typeOfGovernment')}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <MultiSelect
              hideTags
              items={[{
                id: i18n.t('enums.nation.services.legal'),
                name: i18n.t('enums.nation.services.legal'),
              }, {
                id: i18n.t('enums.nation.services.insurance'),
                name: i18n.t('enums.nation.services.insurance'),
              }, {
                id: i18n.t('enums.nation.services.social'),
                name: i18n.t('enums.nation.services.social'),
              }, {
                id: i18n.t('enums.nation.services.diplomatic'),
                name: i18n.t('enums.nation.services.diplomatic'),
              }, {
                id: i18n.t('enums.nation.services.physical'),
                name: i18n.t('enums.nation.services.physical'),
              }]}
              uniqueKey="id"
              ref={(component) => this.multiGovernanceService = component}
              onSelectedItemsChange={(selectedItems) => this.setFieldValue('governanceService', selectedItems)}
              selectedItems={this.state.governanceService}
              selectText={i18n.t('screens.createNation.prompt.servicesOffered')}
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              itemTextColor={Colors.textSecondary}
              displayKey="name"
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
            <View>
              {this.multiGovernanceService && this.multiGovernanceService.getSelectedItemsExt(this.state.governanceService)}
            </View>
					</View>
				</View>
			</PanelView>
		)
	}
	
	_buildOptionsView () {
		return (
			<PanelView style={styles.messageView} title={i18n.t('common.options')} icon=' '>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={i18n.t('screens.createNation.prompt.diplomaticRecognition')}
							value={this.state.diplomaticRecognition}
							onValueChange={(value) => this.setFieldValue('diplomaticRecognition', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={i18n.t('screens.createNation.prompt.servicesUsage')}
							value={this.state.nonCitizenUse}
							onValueChange={(value) => this.setFieldValue('nonCitizenUse', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={i18n.t('screens.createNation.prompt.profit')}
							value={this.state.profit}
							onValueChange={(value) => this.setFieldValue('profit', value)}
						/>
					</View>
				</View>
			</PanelView>
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