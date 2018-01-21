import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { MediaQueryStyleSheet } from 'react-native-responsive'
import PropTypes from 'prop-types'

import GlobalStyles from '../../global/Styles'

//import Text from './Text'
import Button from './Button'

export default class MessageView extends Component {
	
	render () {
		
		const {style, renderBottom, renderAdditionalInfo, children} = this.props
		
		return (
			<View style={[styles.messageView, style]}>
				
				{/* TITLE + ICON */}
				{/* Hide this view if no title or icon to avoid line below it. */}
				{
					( _isNotEmpty(this.props.title) || _isNotEmpty(this.props.icon )) &&
					<View style={styles.messageTitleRowContainer}>
						{
							this.props.title &&
							<View style={styles.messageTitleContainer}>
								<Text style={styles.panelTitle}>
									{this.props.title}
								</Text>
							</View>
						}
						{
							this.props.icon &&
							<View style={styles.messageTitleIcon}>
								<Text style={styles.panelTitle}>
									{this.props.icon}
								</Text>
							</View>
						}
					</View>
				}
				
				
				{/* MAIN DISPLAY AREA */}
				<View style={styles.messageTextContainer}>
					{children}
				</View>
				
				{
					this.props.messageText &&
					<View style={styles.messageTextContainer}>
						<Text style={styles.body}>
							{this.props.messageText}
						</Text>
					</View>
				}
				
				<View style={styles.messageAdditionalInfoContainer}>
					{renderAdditionalInfo && renderAdditionalInfo()}
				</View>
				{
					this.props.onButtonClick &&
					<Button style={styles.button} title={this.props.buttonTitle}
					        onPress={this.props.onButtonClick}/>
				}
				<View style={styles.messageBottomContainer}>
					{renderBottom && renderBottom()}
				</View>
			
			</View>
		)
	}
	
}

function _isNotEmpty (v) {
	return (typeof(v) !== 'undefined' && v)
}

MessageView.PropTypes = {
	title: PropTypes.string,
	icon: PropTypes.string,
	messageText: PropTypes.string,
	buttonTitle: PropTypes.string,
	onButtonClick: PropTypes.function,
}

const styles = MediaQueryStyleSheet.create({
	...GlobalStyles,
})
