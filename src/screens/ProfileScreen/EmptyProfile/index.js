import React, { Component } from 'react'
import {
	Image,
	View,
	Text,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import BackgroundImage from '../../../components/common/BackgroundImage'
import AssetsImage from '../../../global/assetsImages'
import MessageView from '../../../components/common/MessageView'
import FakeNavigationBar from '../../../components/common/FakeNavigationBar'

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
					
					<MessageView
						title="Become a world citizen."
						messageText="Bitnation is a decentralized, open-source movement, powered by the Bitcoin blockchain 2.0 technology, in an
            attempt to foster a peer-to-peer voluntary governance system, rather than the current ‘top-down’,
            ‘one-size-fits-all’ model, restrained by the current nation-state-engineered geographical apartheid, where
            your quality of life is defined by where you were arbitrarily born."
						buttonTitle="Create a User Profile"
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
