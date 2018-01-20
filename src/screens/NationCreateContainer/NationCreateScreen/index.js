import React from 'react'
import {
	View, Image,
	Text, ScrollView, TextInput,
} from 'react-native'

import PropTypes from 'prop-types'
import BackgroundImage from '../../../components/common/BackgroundImage'
import NavigatorComponent from '../../../components/common/NavigatorComponent'
import Colors from '../../../global/Colors'
import { ActionSheet } from 'native-base'
import FakeNavigationBar from '../../../components/common/FakeNavigationBar'
import styles from './styles'
import MessageView from '../../../components/common/MessageView'
import SwitchLabeled from '../../../components/common/SwitchLabeled'
import Images from '../../../global/AssetsImages'
import ModalDropdown from 'react-native-modal-dropdown';

const DONE_BUTTON = 'DONE_BUTTON'

class CreateNation extends NavigatorComponent {
	
	constructor (props) {
		super(props)
		
		this.actionSheet = null
		this._setNavigationButtons(false)
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
	
	componentWillReceiveProps (nextProps) {
		const saveWasEnabled = this._saveShouldBeEnabled(this.props)
		const saveWillBeEnabled = this._saveShouldBeEnabled(nextProps)
		if (saveWasEnabled !== saveWillBeEnabled) {
			this._setNavigationButtons(saveWillBeEnabled)
		}
	};
	
	onNavBarButtonPress (id) {
		if (id === 'cancel') {
			this.props.navigator.pop()
		}
		if (id === DONE_BUTTON) {
			this.props.onDoneNationCreation()
		}
	}
	
	render () {
		return (
			<View style={styles.screenContainer}>
				<BackgroundImage/>
				<FakeNavigationBar/>
				
				{/* TITLE OF SCREEN */}
				<View style={styles.titleBarLarge}>
					<Text style={styles.largeTitle}>Create a Nation</Text>
				</View>
				
				<View style={styles.bodyContainer}>
					{/* SCROLLING PANELS FOR DATA ENTRY */}
					<ScrollView style={styles.scrollView}>
						{this._buildIntroPanel()}
						{this._buildNameView()}
						{this._buildLocationView()}
						{this._buildGovernmentalView()}
						{this._buildOptionsView()}
						{this._buildFeesView()}
						{this._buildBottomView()}
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
	
	_buildNameView () {
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
							/>
						</View>
            <View style={styles.formRow}>
              <TextInput
                style={styles.textInput}
                placeholder='Short description'
                placeholderTextColor='rgba(255,255,255,0.3)'
                keyboardType='default'
              />
            </View>
					</View>
				</View>
			</MessageView>
		)
	}
	
	_buildLocationView () {
		return (
			<MessageView style={styles.messageView} title='Location' icon='?'>
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <ModalDropdown
              style={styles.dropDown}
              textStyle={styles.dropDownTextDefault}
              dropdownTextStyle={styles.dropDownTextList}
              defaultValue={'Is your nation virtual or geographical?...'}
              options={['Virtual', 'Geographical']}
            />
          </View>
        </View>
				<View style={[styles.formRow, styles.formRow]}>
					<View style={styles.fieldsContainer}>
            <SwitchLabeled
              label="Whether your nation exists (represents a real life country)"
              value={false}
            />
					</View>
				</View>
				<Text style={styles.footnote}>
					Virtual locations are in the Pangea cloud and do not have
					fixed addresses. Geographic locations are on Earth and have
					addresses.
				</Text>
			</MessageView>
		)
	}
	
	_buildGovernmentalView () {
		return (
			<MessageView style={styles.messageView}
			             title='Governmental Structure' icon='?'>
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <ModalDropdown
              style={styles.dropDown}
              textStyle={styles.dropDownTextDefault}
              dropdownTextStyle={styles.dropDownTextList}
              defaultValue={'Legal Code...'}
              options={['None', 'Transnational/SupranationalLaw (EU,UN,etc)', 'Multiple (Competing) LegalCodes', 'UNIDROIT Principles', 'Computer Code', 'Common Law', 'Civil Law']}
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
              options={['ID & Reputation', 'Physical & Digital Private or Cooperative Security', 'Nation State Law Enforcement', 'International Law Enforcement (if/when feasible)']}
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
              options={['Democracy', 'Holocracy', 'Autocracy', 'Meritocracy', 'Theocracy']}
            />
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
            <ModalDropdown
              style={styles.dropDown}
              textStyle={styles.dropDownTextDefault}
              dropdownTextStyle={styles.dropDownTextList}
              defaultValue={'Type of Services...'}
              options={['Legal Services', 'Insurance Services', 'Social Services', 'Security Services', 'Diplomatic Services', 'Physical Residency']}
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
			<MessageView style={styles.messageView} title='Options' icon='?'>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label="I plan to seek diplomatic recognition of my nation as a sovereign entity."
							value={false}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label="Will you let non-citizens of your nation use your governance services?"
							value={true}
						/>
					</View>
				</View>
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <SwitchLabeled
              label="Is your nation for profit?"
              value={false}
            />
          </View>
        </View>
			</MessageView>
		)
	}
	
	_buildFeesView () {
		return (
			<MessageView style={styles.messageView} title='Fees' icon='?'>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label="I agree to pay 1.232 mETH to create this nation."
							value={true}
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