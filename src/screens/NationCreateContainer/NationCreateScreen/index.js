/*
	Nation Create Screen
	Version 0.3.1

	For usage of MultiSelect see: https://github.com/toystars/react-native-multiple-select (We are using a custom UI version)
 */

import React from 'react'
import {
	View, Image, Alert,
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
				nationName: this.props.nationName.trim(),
				nationDescription: this.props.nationDescription.trim(),
				exists: this.props.exists,
				virtualNation: this.props.virtualNation[0] === i18n.t('enums.nation.locationType.geographical'),
				nationCode: this.props.nationCode.join(', '),
				nationCodeLink: this.props.nationCodeLink,
				lawEnforcementMechanism: this.props.lawEnforcementMechanism.join(', '),
				profit: this.props.profit,
				decisionMakingProcess: this.props.decisionMakingProcess.join(', '),
				diplomaticRecognition: this.props.diplomaticRecognition,
				governanceService: this.props.governanceService.join(', '),
				nonCitizenUse: this.props.nonCitizenUse
			}
			this.props.onCreateNation(nation, this.props.navigator)
		}
	}

	_saveShouldBeEnabled () {
		let enabled = true;
		if (!this.props.nationName || this.props.nationName == '')
			enabled = false;
		if (!this.props.nationDescription || this.props.nationDescription == '')
			enabled = false;
		if (!this.props.virtualNation || !this.props.virtualNation.length > 0)
			enabled = false;
		if (!this.props.nationCode || !this.props.nationCode.length > 0)
			enabled = false;
		if (!this.props.lawEnforcementMechanism || !this.props.lawEnforcementMechanism.length > 0)
			enabled = false;
		if (!this.props.decisionMakingProcess || !this.props.decisionMakingProcess.length > 0)
			enabled = false;
		if (!this.props.governanceService || !this.props.governanceService.length > 0)
			enabled = false;
		this._setNavigationButtons(enabled);
	}

	setFieldValue(field, value) {
		//this.props.onNationChange()
		this.props.onNationChange(field, value)
    this._saveShouldBeEnabled
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
                            onPress= { () => this._resetForm()} />
        <NationActionButton iconSource={AssetsImage.Actions.chat}
                            title={i18n.t('screens.createNation.save')} disable={false}
                            onPress= { () => this._saveForm()}/>
        <NationActionButton iconSource={AssetsImage.Actions.chat}
                            title={i18n.t('screens.createNation.delete')} disable={false}
                            onPress= { () => this._deleteForm()}/>
        <NationActionButton iconSource={AssetsImage.Actions.chat}
                            title={i18n.t('screens.createNation.submit')} disable={false}
                            onPress= { () => this._submitForm()}/>
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
        						value={this.props.nationName}
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
        						value={this.props.nationDescription}
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
              selectedItems={this.props.virtualNation}
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
							value={this.props.exists}
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
              selectedItems={this.props.nationCode}
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
              selectedItems={this.props.lawEnforcementMechanism}
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
              selectedItems={this.props.decisionMakingProcess}
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
              selectedItems={this.props.governanceService}
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
              {this.multiGovernanceService && this.multiGovernanceService.getSelectedItemsExt(this.props.governanceService)}
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
							value={this.props.diplomaticRecognition}
							onValueChange={(value) => this.setFieldValue('diplomaticRecognition', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={i18n.t('screens.createNation.prompt.servicesUsage')}
							value={this.props.nonCitizenUse}
							onValueChange={(value) => this.setFieldValue('nonCitizenUse', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={i18n.t('screens.createNation.prompt.profit')}
							value={this.props.profit}
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

	_resetForm () {
    Alert.alert(
      i18n.t('alerts.resetForm.title'),
      i18n.t('alerts.resetForm.subtitle'),
      [
        {text: i18n.t('alerts.resetForm.cancel'), style: 'cancel'},
        {text: i18n.t('alerts.resetForm.confirm'), onPress: () => this.props.onResetNationCreation},
      ],
      { cancelable: false },
    )
	}

  _deleteForm () {
    Alert.alert(
      i18n.t('alerts.deleteForm.title'),
      i18n.t('alerts.deleteForm.subtitle'),
      [
        {text: i18n.t('alerts.deleteForm.cancel'), style: 'cancel'},
        {text: i18n.t('alerts.deleteForm.confirm'), onPress: () => this.props.onResetNationCreation},
      ],
      { cancelable: false },
    )
  }

  _saveForm () {
    Alert.alert(
      i18n.t('alerts.saveForm.title'),
      i18n.t('alerts.saveForm.subtitle'),
      [
        {text: i18n.t('alerts.saveForm.cancel'), style: 'cancel'},
        {text: i18n.t('alerts.saveForm.confirm'), onPress: () => this.props.onResetNationCreation},
      ],
      { cancelable: false },
    )
  }

  _submitForm () {
    Alert.alert(
      i18n.t('alerts.submitForm.title'),
      i18n.t('alerts.submitForm.subtitle'),
      [
        {text: i18n.t('alerts.submitForm.cancel'), style: 'cancel'},
        {text: i18n.t('alerts.submitForm.confirm'), onPress: () => this.props.onResetNationCreation},
      ],
      { cancelable: false },
    )
  }
}

CreateNation.propTypes = {
	onCancelNationCreation: PropTypes.func.isRequired,
	onCreateNation: PropTypes.func.isRequired,
  onResetNationCreation: PropTypes.func.isRequired,
}

export default CreateNation