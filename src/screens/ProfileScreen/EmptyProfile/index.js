import React, { Component } from 'react'
import {
	Image,
	View,
	Text,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import BackgroundImage from '../../../components/common/BackgroundImage'
import AssetsImage from '../../../global/AssetsImages'
import PanelView from '../../../components/common/PanelView'
import FakeNavigationBar from '../../../components/common/FakeNavigationBar'
import i18n from '../../../global/i18n';

class EmptyProfileScreen extends Component {
	
	componentWillMount () {
		this.props.navigator.setButtons({leftButtons: [], rightButtons: []})
	}
	
	render () {
		return (
			<View style={styles.screenContainer}>
				<BackgroundImage/>
				<FakeNavigationBar  />
				<View style={styles.bodyContainer}>
					
					<PanelView
						title={i18n.t('screens.profile.empty.createProfilePanel.title')}
						body={i18n.t('screens.profile.empty.createProfilePanel.text')}
						buttonTitle={i18n.t('screens.profile.empty.createProfilePanel.button')}
						onButtonClick={this.props.onCreateUserProfile}
						style={styles.messageView}
					/>
					
					<View style={styles.bottomSpacer}>
						<Image source={AssetsImage.logo} opacity={0.3} />
					</View>
					
					
				</View>
			</View>
		)
	}
	
}

EmptyProfileScreen.propTypes = {
	onCreateUserProfile: PropTypes.func.isRequired,
}

export default EmptyProfileScreen
